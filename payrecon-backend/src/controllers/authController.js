import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { createAuditLog } from "../services/auditService.js";

// registration controller
export const register = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
      username,
      password,
      role,
      isActive,
    } = req.body;

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Check existing employee ID (if provided)
    if (employeeId) {
      const existingEmployee = await User.findOne({ employeeId });

      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          message: "Employee ID already exists",
        });
      }
    }

    // Check existing username (if provided)
    if (username) {
      const existingUsername = await User.findOne({ username });

      if (existingUsername) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    // Create user
    const user = await User.create({
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
      username,
      password,
      role,
      isActive: isActive ?? true,
      mustChangePassword: true,
      createdBy: req.user._id,
    });

    // Audit Log
    await createAuditLog({
      action: "USER_CREATED",
      description: `Created user ${user.name} (${user.role})`,
      performedBy: req.user._id,
      role: req.user.role,
      metadata: {
        createdUserId: user._id,
        createdUserEmail: user.email,
        createdUserRole: user.role,
      },
      req,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        employeeId: user.employeeId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        department: user.department,
        designation: user.designation,
        username: user.username,
        role: user.role,
        isActive: user.isActive,
        mustChangePassword: user.mustChangePassword,
        createdBy: user.createdBy,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.lastLogin = new Date();
    await user.save();

    await createAuditLog({
      action: "LOGIN",
      description: `${user.name} logged into the system`,
      performedBy: user._id,
      role: user.role,
      req,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("createdBy", "name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout controller
export const logout = async (req, res) => {
  await createAuditLog({
    action: "LOGOUT",
    description: `${req.user.name} logged out`,
    performedBy: req.user._id,
    role: req.user.role,
    req,
  });

  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    const isSamePassword = await user.comparePassword(newPassword);

    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the current password.",
      });
    }

    user.password = newPassword;
    user.mustChangePassword = false;

    await user.save();

    await createAuditLog({
      action: "PASSWORD_CHANGED",
      description: `${user.name} changed password`,
      performedBy: user._id,
      role: user.role,
      req,
    });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
