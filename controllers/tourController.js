/*
Without Class
*/

// const Tour = require('../models/TourModel');

// const aliasTopTours = async (req, res, next) => {
//   // here well modify query for best five budget tours
//   try {
//     req.query.limit = '5';
//     req.query.sort = '-ratingsAverage,price';
//     req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//     next();
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error,
//     });
//   }
// };

// const getAllTours = async (req, res) => {
//   try {
//     console.log('xxxxxxxxx', req.query);
//     // FILTERING
//     const queryObj = { ...req.query };
//     const excludedFields = ['sort', 'limit', 'page', 'fields']; // as these things are handled in separate ways in mongoose
//     excludedFields.forEach((el) => delete queryObj[el]);
//     console.log('rrrrrrr', queryObj);

//     // ADVANCED FILTERING
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     let query = Tour.find(JSON.parse(queryStr));

//     // { difficulty: { $gte: '4' } } this kind required for advanced filtering
//     // { difficulty: { gte: '4' } } received this need to add $

//     // SORTING
//     if (req.query.sort) {
//       // mongdb sort sort('a b c');
//       const sortBY = req.query.sort.split(',').join(' '); // this removes comma from api sort with empty space
//       query = query.sort(sortBY);
//     } else {
//       query = query.sort('-createdAt'); // default sort based on creation date
//     }

//     // FIELD LIMITING
//     if (req.query.fields) {
//       const selectedFields = req.query.fields.split(',').join(' ');
//       query = query.select(selectedFields);
//     } else {
//       query = query.select('-__v');
//     }

//     // PAGINATION

//     // page=2&limit=3

//     const page = req.query.page * 1 || 1; // converting string into number and also default page as 1;
//     const limit = req.query.limit * 1 || 100;
//     const skipValue = (page - 1) * limit;
//     query = query.skip(skipValue).limit(limit);
//     if (req.query.page) {
//       const numTours = await Tour.countDocuments();
//       if (skipValue >= numTours)
//         throw new Error('This Page Doesnot Exists ...');
//     }

//     const tours = await query;
//     res.status(200).json({
//       status: 'success',
//       results: tours.length,
//       data: {
//         tours,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error,
//     });
//   }
// };

// const getTour = async (req, res) => {
//   try {
//     const tour = await Tour.findById(req.params.id);
//     // Tour.findOne({_id:req.params.id}) same result as above
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error,
//     });
//   }
// };

// const createTour = async (req, res) => {
//   try {
//     const newTour = await Tour.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error,
//     });
//   }
// };

// const updateTour = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: tour,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error,
//     });
//   }
// };
// const deleteTour = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: {
//         tour: tour,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error,
//     });
//   }
// };

// module.exports = {
//   getAllTours,
//   getTour,
//   createTour,
//   updateTour,
//   deleteTour,
//   aliasTopTours,
// };

/*
With Class
*/

const Tour = require('../models/TourModel');
const APIFeatures = require('../utils/apiFeatures');

const aliasTopTours = async (req, res, next) => {
  // here well modify query for best five budget tours
  try {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const getAllTours = async (req, res) => {
  try {
    console.log('xxxxxxxxx', req.query);
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({_id:req.params.id}) same result as above
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
};
