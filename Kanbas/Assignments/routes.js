import express from "express";
import * as dao from "./dao.js";

const router = express.Router();

export default function AssignmentsRoute(app) {
    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    app.post("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        const assignmentData = { ...req.body, course: courseId };
        const newAssignment = dao.addAssignment(assignmentData);
        res.status(201).json(newAssignment);
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const updates = req.body;
        const updatedAssignment = dao.updateAssignment(assignmentId, updates);
    
        if (!updatedAssignment) {
            res.status(404).send({ error: "Assignment not found" });
        } else {
            res.json(updatedAssignment);
        }
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const deleted = dao.deleteAssignment(assignmentId);
    
        if (!deleted) {
            res.status(404).send({ error: "Assignment not found" });
        } else {
            res.sendStatus(204);
        }
    });
}