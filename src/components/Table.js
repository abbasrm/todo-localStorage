import React from "react";
import "../css/bootstrap.min.css";
import Tasks from './Tasks'

export const Table = props => {
  const doneTasks = props.tasks.filter((elem) => elem.done === true),
    notDoneTasks = props.tasks.filter((elem) => elem.done === false);

  const tasks = props.tasks.length ? (
    <table className="table mt-4">
      <thead>
        <tr className="thead-dark">
          <th>Title</th>
          <th>Detail</th>
          <th>Date</th>
          <th>done</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {notDoneTasks.length ?
        <Tasks
          tasks={notDoneTasks}
          onChange={props.changeDone}
          deleteTask={props.deleteTask} /> :
          <tr><td colSpan="4" className="text-center mx-auto text-success py-4">All tasks are done..</td></tr>}

        {doneTasks.length ? <tr><td colSpan="4" style={{ padding: 30 }}><button className="btn btn-light text-center py-0" onClick={(e) => props.showDoneClick(e)}>{props.showDone ? 'Hide' : 'Show'} completed tasks...</button></td></tr> : null}

        {props.showDone ?
          <Tasks
            tasks={doneTasks}
            onChange={props.changeDone}
            deleteTask={props.deleteTask} /> :
          null}

      </tbody>
    </table>
  ) : <p className="text-center text-secondary p-4">Please add new tasks...</p>;

  return tasks;
};
