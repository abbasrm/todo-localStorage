import React from 'react';
import DeleteButton from './DeleteButton'



const Tasks = props => {
  return props.tasks.map((elem, i) => {

    let inputProps = {},
    doneClasses = ['form-check-labe'],
    doneText = '';

    if (elem.done) {
      inputProps.defaultChecked = true;
      doneClasses.push('text-success');
      doneText = 'Done';
    } else {
      inputProps = {};
      doneClasses.push('text-danger');
      doneText = 'Not done yet!'
    };

    return (<tr key={elem.id}>
      <td>{elem.title}</td>
      <td>{elem.detail}</td>
      <td>{elem.date}</td>
      <td>
        <div className="form-check form-check-inline ml-3">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => props.onChange(elem.id)}
            {...inputProps}
          />
          <label className={doneClasses.join(' ')}>{doneText}</label>
        </div>
      </td>
      <td>
        <DeleteButton
          handleIdDelete={props.deleteTask}
          id={elem.id}
        />
      </td>
    </tr>)

  })
}

export default Tasks;