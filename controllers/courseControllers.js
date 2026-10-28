let cl = console.log;
const courses = require('../data/courses');

const fetchCourses = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: `fetchCourses Successfully!!`,
            data: courses
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error while fetching courses'
        })
    }
}

const fetchSingleCourse = (req, res) => {
    try {
        let getId = Number(req.params.id);
        let obj = courses.find(obj => obj.id === getId)
        if (!obj) {
            return res.status(404).json({
                success: false,
                message: `The course with id ${getId} is not found`
            })
        }
        res.status(200).json({
            success: true,
            message: `The course is found successfully!!`,
            data: obj,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error while fetching the course.`
        })
    }
}

const createCourse = (req, res) => {
    try {
        let { courseName, duration, fees, instructor, isAvailable } = req.body
        let obj = {
            courseName,
            duration,
            fees,
            instructor,
            isAvailable,
            id: Number(Date.now().toString())
        }
        courses.unshift(obj);
        res.status(201).json({
            success: true,
            message: `The courses added successfully!!`,
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error while added course.`
        })

    }
}

const deleteCourse = (req, res) => {
    try {
        let deleteId = Number(req.params.id);
        let findIndex = courses.findIndex(obj => obj.id === deleteId);
        if (findIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The course with deleteId ${deleteId} is not found.`
            })
        }
        courses.splice(findIndex, 1);
        res.status(200).json({
            success: true,
            message: `The course deleted successfully!!`
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error while fetching Delete course`
        })
    }

}

let updateCourse = (req, res) => {
    try {
        let updateId = Number(req.params.id);
        let { courseName, duration, fees, instructor, isAvailable } = req.body
        let findIndex = courses.findIndex(obj => obj.id === updateId);
         if (findIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The course with id ${updateId} is not found`
            });
        }
        let updateObj = {
            ...courses[findIndex],
            ...req.body,
            id: updateId
        }
        courses[findIndex] = updateObj
        res.status(200).json({
            success: true,
            message: `The course Update successfully!!`,
            data: updateObj
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error while updating course`
        })
    }


}

module.exports = {
    fetchCourses,
    fetchSingleCourse,
    createCourse,
    deleteCourse,
    updateCourse
}