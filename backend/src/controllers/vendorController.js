const Vendor = require('../models/Vendor');

/**
 * GET /api/vendors
 */
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().lean();
    return res.status(200).json(vendors);
  } catch (err) {
    console.error('getAllVendors error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * GET /api/vendors/:id
 */
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).lean();
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    return res.status(200).json(vendor);
  } catch (err) {
    console.error('getVendorById error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * POST /api/vendors
 */
exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    return res.status(201).json(vendor);
  } catch (err) {
    console.error('createVendor error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/vendors/:id
 */
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    return res.status(200).json(vendor);
  } catch (err) {
    console.error('updateVendor error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * DELETE /api/vendors/:id
 */
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id).lean();
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    return res.status(200).json({ message: 'Vendor deleted' });
  } catch (err) {
    console.error('deleteVendor error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};