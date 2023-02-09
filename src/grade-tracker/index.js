import * as React from "react";
import { Container, Row, Col, Form, Button, Table, ControlLabel } from "react-bootstrap";
import './index.css';
import { useEffect, useState } from "react";
import csData from './cs-2019.json';
import itData from './it-2019.json';

const grades = [
    { name: "A", value: 4 },
    { name: "A-", value: 3.75 },
    { name: "B+", value: 3.25 },
    { name: "B", value: 3 },
    { name: "B-", value: 2.75 },
    { name: "C+", value: 2.25 },
    { name: "C", value: 2 },
    { name: "C-", value: 1.75 },
    { name: "D", value: 1 },
    { name: "F", value: 0 },
    { name: "W", value: "exclude" }
];

const selectableSemester = ['1/2022', '2/2022', '3/2022', '1/2023', '2/2023', '3/2023'];

export default function Gpa() {
    const [selectAbleCourses, setSelectAbleCourses] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [grade, setGrade] = useState('');
    const [courseData, setCourseData] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState('');
    const [gpa, setGpa] = useState(0);

    const majorChange = event => {
        setSelectedMajor(event.target.value);
        const course = [];
        const subjects = event.target.value === 'cs' ? csData.curriculum.subjects : itData.curriculum.subjects;
        for (let subjectsKey of subjects) {
            for (let c of subjectsKey.subjects) {
                course.push(c);
            }
        }
        setSelectAbleCourses(course);
    };

    const semesterChange = event => {
        setSelectedSemester(event.target.value);
    };

    const courseChange = event => {
        setSelectedCourse(event.target.value);
    };

    const gradeChange = event => {
        setGrade(event.target.value);
    };

    const calculateGpa = () => {
        let totalPoints = 0;
        let totalUnits = courseData.length;

        courseData.forEach(course => {
            let gradePoint = grades.find(grade => grade.name === course.grade).point;
            totalPoints += gradePoint;
        });

        let calculatedGpa = totalPoints / totalUnits;
        setGpa(calculatedGpa);
    };

    const click = () => {
        const cdd = courseData;
        cdd.push({
            semester: selectedSemester,
            courseCode: selectedCourse,
            course: selectAbleCourses.find(item => item.code === selectedCourse).name,
            grade: grade
        });
        setCourseData([...cdd]);
        localStorage.setItem("courseData", JSON.stringify(cdd));
    };

    useEffect(() => {
        const storedData = localStorage.getItem("courseData");
        if (storedData) {
            setCourseData(JSON.parse(storedData));
        }
    }, []);
    return (
        <Container className="app-container">
            <Row className="header-row">
                <Col md={3}>
                    <Form.Control as="select" onChange={majorChange}>
                        <option label="Major: " value="" disabled selected hidden></option>
                        <option value="cs">Computer Science</option>
                        <option value="it">Information Technology</option>
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Form.Control as="select" onChange={semesterChange}>
                        <option label="Semester: " value="" disabled selected hidden></option>
                        {selectableSemester.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md={3}>
                    <Form.Control as="select" onChange={courseChange}>
                        <option label="Course: " value="" disabled selected hidden></option>
                        {selectAbleCourses.map((item, index) => (
                            <option key={index} value={item.code}>{item.code} - {item.name}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md={2}>
                    <Form.Control as="select" onChange={gradeChange}>
                        <option label="Grade: " value="" disabled selected hidden></option>
                        {grades.map((item, index) => (
                            <option key={index} value={item.value}>{item.name}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col md={1}>
                    <Button onClick={click}>Add</Button>
                </Col>

            </Row>
            <Row className="table-row">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Semester</th>
                                <th>Course Code</th>
                                <th>Course</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.semester}</td>
                                    <td>{item.courseCode}</td>
                                    <td>{item.course}</td>
                                    <td>{item.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col xs={12} sm={6}>
                    <Button variant="primary" onClick={calculateGpa} disabled={!courseData.length}>
                        Calculate GPA
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col xs={12} sm={6}>
                    <h3>GPA: {gpa.toFixed(2)}</h3>
                </Col>
            </Row>

        </Container>
    );
}


