
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-datatable';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


export default function MaterialTable1() {
    
    const { register, handleSubmit, errors } = useForm();
    const classes = useStyles();
    const [item, setItem] = useState([]);
    const handleChange = (event) =>{
        setItem(event.target.value)
        console.log(setItem(event.target.value))
    }

    const columns = [
      {
       name: "Rut Alumno",
       field: "rut",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "Nombre",
       field: "nombre",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
        name: 'Apellidos', 
        field: 'apellido'
      },{
        name: "Seleccionar",
        options: {
            headerNoWrap: true,
            customBodyRender: (item, tablemeta, update) => {
                return (
                    <div>
                    <IconButton
                        variant='outlined'

                        className="btnblock"
                        onClick={() => handleSelecciondelete(item._id)}
                    >
                      <DeleteIcon/>
                    </IconButton>
                    <IconButton
                        variant='outlined'

                        className="btnblock"
                        onClick={() => handleSelecciondelete(item._id)}
                    >
                      <EditIcon/>
                    </IconButton>
                    
                    </div>
                );
            },
        },
    },
     ];

     const handleSelecciondelete = (data) => {
      axios.delete(`http://localhost:5000/api/EliminarAlumno/${data}`)
      .then(
        (response)=>{
          console.log(response.data);
          swal({ 
              title: "Datos Eliminados",
              text: "El alumno se a eliminado",
              icon: "success",
              button: "Continuar",
          });
        }
      ).catch((error) => {
        console.log(error);
      })
    }

  
    const onSubmit = data => {
    axios
    .post("http://localhost:5000/api/guardarAlumno", data)
    .then(
      (response)=>{
        swal({ 
            title: "Datos Guardados",
            text: "El Alumno se a guardado",
            icon: "success",
            button: "Continuar",
        });
      }
    )
    .catch((error) => {
      swal({ 
        title: "Datos incorrectos",
        text: "El rut esta mal escrito formato ejemplo: 19.425.846-1",
        icon: "warning",
        button: "Continuar",
    });
    })
  }
  
  useEffect(() => {
    cargar();

  }, []);


  const cargar = async() =>{
    const { data } = await axios.get("http://localhost:5000/api/todosAlumnos");

    setItem(data.alumno);
    return null;
  }
  console.log(errors);
  return (

     <div> 
         <h1>Ingreso de Alumnos</h1>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>

      <TextField id="outlined-basic" label="Rut Alumno" variant="outlined" name="rut" inputRef={register} />
      <TextField id="outlined-basic1" label="Nombres" variant="outlined" name="nombre" inputRef={register} />
      <TextField id="outlined-basic2" label="Apellidos" variant="outlined" name="apellido" inputRef={register} />

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Enviar
      </Button>
    </form>
        <h1>Lista de Alumnos</h1>
        <MaterialTable
        title="Alumnos Guardados"
        columns={columns}
        data={item}
        onChange={handleChange}
        editable={{
            onRowAdd: (newData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                    setItem((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                });
                }, 600);
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                resolve();
                if (oldData) {
                    setItem((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                    });
                }
                }, 600);
            }),
            onRowDelete: (oldData) =>
            new Promise((resolve) => {
                setTimeout(() => {
                resolve();
                setItem((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                });
                }, 600);
            }),
        }}
        />
    </div>   

    );

}