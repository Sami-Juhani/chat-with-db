"""Database models and utilities for the chat-with-db application.

This module defines SQLAlchemy models for Users, Orders, and OrderItems,
along with utility functions for user management and database operations.
Includes functionality for password hashing, user authentication, and order management.
"""

import os
import enum
from datetime import datetime

from dotenv import load_dotenv
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import create_engine, Column, Integer, String, Enum, DateTime, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, joinedload

# Load environment variables
load_dotenv()

db_uri = os.getenv("DB_URI")
if not db_uri:
    raise ValueError("DB_URI environment variable is not set")

# Create engine without logging
engine = create_engine(db_uri, echo=False)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


class UserType(enum.Enum):
    """
    User types for authentication and authorization.
    """
    ADMIN = "ADMIN"
    USER = "USER"


class User(Base, SerializerMixin):
    """
    Represents a user in the database.

    Attributes:
        user_id (int): The unique identifier for the user.
        name (str): The name of the user.
        email (str): The email address of the user.
        password (str): The hashed password of the user.
        address (str): The address of the user.
        created_at (datetime): The date and time the user was created.
        type (UserType): The type of user (ADMIN or USER).
        orders (List[Order]): The orders associated with the user.
    """
    __tablename__ = "users"
    serialize_rules = ('-password', '-orders.user')

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)  # Increased length for hash
    address = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    type = Column(Enum(UserType), default=UserType.USER)

    # Relationship to orders
    orders = relationship("Order", back_populates="user")


class Order(Base, SerializerMixin):
    """
    Represents an order in the database.

    Attributes:
        order_id (int): The unique identifier for the order.
        user_id (int): The identifier of the user who placed the order.
        total_price (float): The total price of the order.
        status (str): The status of the order (e.g., 'pending', 'completed').
        estimated_delivery (datetime): The estimated delivery time of the order.
        created_at (datetime): The date and time the order was created.
        order_items (List[OrderItem]): The items in the order.
        user (User): The user who placed the order.
    """
    __tablename__ = "orders"
    serialize_rules = ('-user', '-order_items.order')

    order_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    total_price = Column(Float)
    status = Column(String)
    estimated_delivery = Column(DateTime)
    created_at = Column(DateTime)
    order_items = relationship("OrderItem", back_populates="order")
    user = relationship("User", back_populates="orders")


class OrderItem(Base, SerializerMixin):
    """
    Represents an item in an order.

    Attributes:
        order_item_id (int): The unique identifier for the order item.
        order_id (int): The identifier of the order to which the item belongs.
        product_name (str): The name of the product.
        product_category (str): The category of the product.
        quantity (int): The quantity of the product.
        price (float): The price of the product.
        img_url (str): The URL of the image for the product.
        order (Order): The order to which the item belongs.
    """
    __tablename__ = "order_items"
    serialize_rules = ('-order',)

    order_item_id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('orders.order_id'))
    product_name = Column(String)
    product_category = Column(String)
    quantity = Column(Integer)
    price = Column(Float)
    img_url = Column(String)
    order = relationship("Order", back_populates="order_items")


def get_user_by_email(email: str):
    """Get user from Neon database by email"""
    db = SessionLocal()
    try:
        return db.query(User).filter(User.email == email).first()
    except Exception as e:
        print(f"Database error: {str(e)}")
        raise
    finally:
        db.close()


def get_user_with_orders(user_id: int):
    """Get user data including their orders"""
    db = SessionLocal()
    try:
        user = db.query(User).options(
            joinedload(User.orders).joinedload(Order.order_items)
        ).filter(User.user_id == user_id).first()

        if not user:
            return None

        # Convert to dict and handle enum
        user_dict = user.to_dict()
        user_dict['type'] = str(user.type.value)

        return user_dict

    except Exception as e:
        print(f"Database error: {str(e)}")
        raise
    finally:
        db.close()
