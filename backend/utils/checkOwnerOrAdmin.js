const AppError = require('./appError');

// Model: هو موديل Mongoose (مثلاً Auction أو Tenders)
// ownerField: اسم الحقل الذي يحوي معرف المالك (عادة 'user')
const checkOwnerOrAdmin = (Model, ownerField = 'user') => {
  return async (req, res, next) => {
    try {
      // إذا كان المستخدم أدمن، مرر مباشرة
      if (req.user.role === 'admin') return next();

      // جلب الوثيقة (مزاد أو مناقصة)
      const doc = await Model.findById(req.params.id);
      if (!doc) {
        return next(new AppError('Document not found', 404));
      }

      // تحقق من الملكية
      if (doc[ownerField].toString() !== req.user.id) {
        return next(
          new AppError(
            'You do not have permission to perform this action',
            403,
          ),
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = checkOwnerOrAdmin;
