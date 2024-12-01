import Database from "../../Database/index.js";

export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
}

export function addAssignment(assignment) {
    const { assignments } = Database;
    const newAssignment = {
        _id: Date.now().toString(), // Generate unique ID
        ...assignment,
    };
    assignments.push(newAssignment);
    return newAssignment;
}

export function updateAssignment(assignmentId, updates) {
    const { assignments } = Database;
    const assignmentIndex = assignments.findIndex((a) => a._id === assignmentId);

    if (assignmentIndex === -1) {
        return null; // Assignment not found
    }

    const updatedAssignment = { ...assignments[assignmentIndex], ...updates };
    assignments[assignmentIndex] = updatedAssignment;

    return updatedAssignment;
}

export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    const initialLength = assignments.length;

    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);

    return Database.assignments.length < initialLength;
}
