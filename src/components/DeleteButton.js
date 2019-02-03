import React from 'react';
import { Aux } from '../hoc/hoc';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = props => (
    <button type="button" className="btn btn-danger px-1 py-0" onClick={() => props.handleIdDelete(props.id)} >
      <FontAwesomeIcon icon={faTrashAlt} /> 
    </button>
);

export default DeleteButton