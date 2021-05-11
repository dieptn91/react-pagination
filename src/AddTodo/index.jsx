import React, { useState } from 'react';
import PropTypes from 'prop-types';

AddTodo.propTypes = {
    onSubmit:PropTypes.func,
};

AddTodo.defaultProps ={
    onSubmit:null,
}


function AddTodo(props) {
    const {onSubmit} = props;

    const [value,setValue] = useState('');
    function handleChangeSubmit(e){
        console.log(e.target.value);
        setValue(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!onSubmit) return;
        const newFormValues ={
            title:value,
        }
        onSubmit(newFormValues);
        setValue('');
    }

    return (
        <form onSubmit ={handleSubmit}>
            <input type="text" value ={value} onChange ={handleChangeSubmit}/>
        </form>
    );
}

export default AddTodo;