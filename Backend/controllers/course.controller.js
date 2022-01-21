const { create, read } = require('../models/course.model');

const search = async (data) => {
  const courses = await read(data);

  if (courses.length > 0) return courses[0]['courseID'];

  const course = await create(data);
  return course['insertId'];
};

module.exports = { search };
