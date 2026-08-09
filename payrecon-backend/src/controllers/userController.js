import User from "../models/User.js";
import { createAuditLog } from "../services/auditService.js";

// to get all the users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent self role change
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    user.role = role;

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to update the user status expect the admin
export const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent self deactivation
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account",
      });
    }

    // Already same status
    if (user.isActive === isActive) {
      return res.status(400).json({
        success: false,
        message: `User is already ${isActive ? "active" : "inactive"}`,
      });
    }

    user.isActive = isActive;

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// to edit the user data
export const updateUser = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
      username,
      role,
      isActive,
    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from editing their own role/status
    if (user._id.toString() === req.user._id.toString()) {
      if (role !== undefined && role !== user.role) {
        return res.status(400).json({
          success: false,
          message: "You cannot change your own role",
        });
      }

      if (isActive !== undefined && isActive !== user.isActive) {
        return res.status(400).json({
          success: false,
          message: "You cannot deactivate your own account",
        });
      }
    }

    // Email uniqueness
    if (email && email !== user.email) {
      const existingEmail = await User.findOne({
        email,
      });

      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // Employee ID uniqueness
    if (employeeId && employeeId !== user.employeeId) {
      const existingEmployee = await User.findOne({
        employeeId,
      });

      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          message: "Employee ID already exists",
        });
      }
    }

    // Username uniqueness
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({
        username,
      });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    if (employeeId !== undefined) user.employeeId = employeeId;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (department !== undefined) user.department = department;
    if (designation !== undefined) user.designation = designation;
    if (username !== undefined) user.username = username;
    if (role !== undefined) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate("createdBy", "name email");

    await createAuditLog({
      action: "USER_UPDATED",
      description: `Updated user ${user.name}`,
      performedBy: req.user._id,
      role: req.user.role,
      metadata: {
        updatedUserId: user._id,
        updatedUserEmail: user.email,
      },
      req,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
