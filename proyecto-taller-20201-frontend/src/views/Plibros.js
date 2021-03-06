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
import Popup from './Popup';
import Usuario from './Pusuario'

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
    const [openPopup, setOpenPopup] = useState(false);
    const [MyValue, setValue] = useState([]);

    const columns = [
      {
       name: "ID Libro",
       field: "id_libro",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
       name: "Titulo",
       field: "titulo",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
        name: 'Autor', 
        field: 'autor'
      },
      {
        name: 'Idioma', 
        field: 'idioma'
      },
      {
        name: 'contador', 
        field: 'count'
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
                        onClick={() => setOpenPopup(true)}
                    >
                      <EditIcon/>
                    </IconButton>
                      <Popup
                        openPopup ={openPopup}
                        setOpenPopup ={setOpenPopup}
                      >
                        <Usuario/>
                      </Popup>
                    </div>
                );
            },
        },
    },
    
     ];
     

    const handleSelecciondelete = (data) => {
      axios.delete(`http://localhost:5000/api/Eliminarlibro/${data}`)
      .then(
        (response)=>{
          console.log(response.data);
          swal({ 
              title: "Datos Eliminados",
              text: "El libro se a eliminado de la biblioteca",
              icon: "success",
              button: "Continuar",
          });
        }
      ).catch((error) => {
        console.log(error);
        console.log(data);
      })
    }
    
  
    const onSubmit = data => {
    axios
    .post("http://localhost:5000/api/guardarLibro", data)
    .then(
      (response)=>{
        console.log(response.data);
        swal({ 
            title: "Datos Guardados",
            text: "El libro se a guardado en la biblioteca",
            icon: "success",
            button: "Continuar",
        });
      }
    )
    .catch((error) => {
      console.log(error);
    })
  }
  

  const contador = async(data) =>{
    const {count} = await axios.get("http://localhost:5000/api/buscarlibro",{
        titulo:data
    })

    console.log(data)
    return null;
  }
  

  useEffect(() => {
    cargar();

  }, []);


  const cargar = async() =>{
    const { data } = await axios.get("http://localhost:5000/api/todosLibros");

    setItem(data.libro);
    return null;
  }
  console.log(errors);
  return (

     <div> 
         <h1>Ingreso de Libros</h1>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>

      <TextField id="outlined-basic" label="Libro ID" variant="outlined" name="id_libro" inputRef={register} />
      <TextField id="outlined-basic1" label="Titulo del libro" variant="outlined" name="titulo" inputRef={register} />
      <TextField id="outlined-basic2" label="Autor del libro" variant="outlined" name="autor" inputRef={register} />
      <TextField id="outlined-basic3" label="Idioma" variant="outlined" name="idioma" inputRef={register} />

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Enviar
      </Button>
    </form>
        <h1>Biblioteca Virtual</h1>
        <MaterialTable
        title="Libros guardados"
        columns={columns}
        data={item}
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

        <TextField 
          value={MyValue}
          onChange = {(e) => setValue (e.target.value)} 
        />
        <span>{MyValue}</span>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={()=>contador(MyValue)}
        >
          Enviar
        </Button>
    </div>   

    );

}