import React, { Component } from "react";
import DatePicker from "react-datepicker";

import classes from "./App.module.css";
import { Table } from "./components/Table";
import { Form } from "./components/Form";
import { Aux } from './hoc/hoc'

import "react-datepicker/dist/react-datepicker.css";


// Comments are usually another way of doing the same thing after or before that comment (and mostly in ES5 or less recommended way).

class App extends Component {
  state = {
    tasks: [],
    isValid: {
      title: '',
      detail: ''      
    },
    date: new Date(),
    showDone: false
  };

  getLocalStorageTasks = () => {
    const tasks = window.localStorage.getItem("tasks"),
      currentTasks = tasks === null ? this.updateLocalStorageTasks([]) : tasks;
    return currentTasks;
  };

  componentDidMount() {
    this.getLocalStorageTasks();
    this.setState({ tasks: JSON.parse([this.getLocalStorageTasks()])});
  };

  addNewTask = newTask => {
    // const tasks = this.state.tasks.slice();
    // tasks.push(newTask);

    const tasks = [...this.state.tasks, newTask];
    this.updateLocalStorageTasks(tasks);
  };

  updateLocalStorageTasks = tasks => {
    this.setState({ tasks });
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  getMaxId = () => {
    let tasks = this.state.tasks,
      tasksIds = tasks.map(task => {
        return task.id;
      });

    let maxId = tasks.length ? Math.max(...tasksIds) : 0;
    return maxId;
  };

  getInput = e => {
    e.preventDefault();

    let title = e.target.elements.title.value,
      detail = e.target.elements.detail.value,
      done = false,
      maxId = this.getMaxId(),
      getDate = this.state.date,
      date = getDate.getDate();
      //date = `${date1[2]}/${date1[3]}`;
      

    const newTask = {
      //id: new Date().valueOf()
      id: maxId + 1,
      title: title,
      detail: detail,
      done: done,
      date
    };

    const reTitle = /^[a-zA-z ]{2,12}$/;
    const reDetail = /^[a-zA-z ]{5,35}$/;

    if (!reTitle.test(title) || !reDetail.test(detail)) {
      this.validationCheck("title", title, reTitle);
      this.validationCheck("detail", detail, reDetail);
    } else {
      this.setState({
        isValid: {
          title: true,
          detail: true
        }
      });

      // const isTitle = this.state.tasks.find(e => e.title === newTask.title),
      //   isDetail = this.state.tasks.find(e => e.detail === newTask.detail),
      //   isDone = this.state.tasks.find(e => e.done === newTask.done);
      const inValid = this.state.tasks.find(e => {
        return e.title === newTask.title && e.detail === newTask.detail && e.done === newTask.done
      })

      if (inValid) {
        alert("This task title and detail have been added before and maked as not done yet!");
      } else {
        this.addNewTask(newTask);

        e.target.elements.title.value = "";
        e.target.elements.detail.value = "";
      }
    }
  };

  deleteTask = delId => {
    const task = this.state.tasks.filter(elem => elem.id === delId),
      taskTitle = task[0].title;

    // const taskIndex = this.state.tasks.findIndex(elem => elem.id === delId),
    //       taskTitle = this.state.tasks[taskIndex].title

    // const task = this.state.tasks.find(elem => elem.id === delId),
    //       taskTitle = task.title

    if (window.confirm(`Are you sure to delete ${taskTitle}?`)) {
      const tasks = this.state.tasks.filter(elem => elem.id !== delId);

      this.updateLocalStorageTasks(tasks);
    }
  };

  clearAllTasks = () => {
    if (window.confirm("Are you sure to delete ALL tasks?")) {
      this.updateLocalStorageTasks([]);
    }
  };

  clearCompletedTasks = () => {
    if (window.confirm("Are you sure to delete all completed tasks?")) {
      const tasks = [...this.state.tasks.filter((elem) => elem.done === false)];
      this.updateLocalStorageTasks(tasks);
    }
  }

  validationCheck = (type, input, re) => {
    if (!re.test(input)) {
      this.setState(({ isValid }) => ({
        isValid: {
          ...isValid,
          [type]: "is-invalid"
        }
      }));
    } else {
      this.setState(({ isValid }) => ({
        isValid: {
          ...isValid,
          [type]: "is-valid"
        }
      }));
    }
  };

  calculateClass = type => {
    const Type = this.state.isValid[type];

    let isValid = ["form-control"];

    if (Type === "is-invalid") {
      isValid.push("is-invalid");
    } else if (Type === "is-valid") {
      isValid.push("is-valid");
    }

    return isValid.join(" ");
  };

  changeDone = (id) => {
    const taskIndex = this.state.tasks.findIndex(e => e.id === id);

    const task = { ...this.state.tasks[taskIndex] };
    task.done = task.done ? false : true;

    const tasks = [...this.state.tasks];
    tasks[taskIndex] = task;

    this.updateLocalStorageTasks(tasks);
  };

  showDoneHandler = e => {
    let newDoneState = this.state.showDone ? false : true;
    this.setState({ showDone: newDoneState });
    e.preventDefault()
  }

  changeDateHandler = (d) => {
    this.setState({ date: d });
    console.log(this.state.date)
  }

  render = () => {
    return (
      <Aux>
        <React.Fragment>
          <>
            <div className={[classes['App-class'], classes.App2].join(' ')}>
              <div className="container my-5" style={{ border: "1px solid #ccc" }}>
                <div className="row">
                  <div className="col-lg-12 col-sm-12">
                    <Form
                      getTasks={this.getInput}
                      tasks={this.state.tasks}
                      clc={this.calculateClass}
                      clearLocalStorage={this.clearAllTasks}
                      clearCompleted={this.clearCompletedTasks}
                    />

                    <DatePicker
                      selected={this.state.date}
                      onChange={this.changeDateHandler}
                    />

                    <Table
                      tasks={this.state.tasks}
                      deleteTask={this.deleteTask}
                      delTaskByIndex={this.deleteTaskByIndex}
                      changeDone={this.changeDone}
                      showDone={this.state.showDone}
                      showDoneClick={this.showDoneHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        </React.Fragment>

      </Aux>


    );
  };
}

export default App;
