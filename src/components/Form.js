import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Aux } from '../hoc/hoc'

export const Form = (props) => {

  let clearBtn = null;

  if (props.tasks.length) {
    clearBtn = (
      <div className="col-md-3 mt-4">
        <Aux>
          <button type="button" className="btn btn-block btn-danger" onClick={props.clearLocalStorage} > <FontAwesomeIcon icon={faTrashAlt} /> Clear All Tasks </button>
          {props.tasks.filter((e) => e.done === true).length ? <button type="button" className="btn btn-block  btn-warning" onClick={props.clearCompleted} > <FontAwesomeIcon icon={faTrashAlt} /> Clear completed Tasks </button> : null}
        </Aux>
      </div>

    );
  }

  // let isValid = 'form-control';

  // if(props.isValid.detail === 'invalid'){
  //   isValid = "form-control is-invalid"
  // }else if (props.isValid.detail === 'is-valid'){
  //   isValid = "form-control is-valid"
  // }

  return (
    <div className="mx-auto py-4 ">
      <form className="needs-validation form-inline mx-auto " onSubmit={props.getTasks}>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="validationCustom01">Task Title</label>
            <input type="text" id="validationCustom01" className={props.clc('title')} name="title" placeholder="Enter task title" />
            <div className="invalid-feedback">
              Please enter a task title between 2 and 12 letters!
      </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">

            <label htmlFor="validationCustom02">Task Detail</label>
            <input type="text" id="validationCustom02" className={props.clc('detail')} name="detail" placeholder="Enter task detail" />
            <div className="invalid-feedback">
              Please enter a task detail between 5 and 35 letters!
      </div>
          </div>
        </div>
        <div className="col-md-2 mt-4">
          <button type="submit" className="btn btn-block text-center mx-auto btn-success" > <FontAwesomeIcon icon={faPlus} /> Add </button>
        </div>

        {clearBtn}


        {/* {props.tasksLength ? <div className="col-md-2 mt-4"><input type="button" className="btn btn-block btn-danger" onClick={props.clearLocalStorage} value="Clear All Tasks" /></div>: null} */}

      </form>
    </div>
  );
};