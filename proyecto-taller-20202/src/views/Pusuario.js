
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


export default function FormUsuario (){

    const { register, handleSubmit, errors } = useForm();
    const classes = useStyles();
    
    const onSubmit = data => {
        if(data.pass === data.passConfirm){
            axios
            .post("http://localhost:5000/api/registro", {
                nombre:data.nombre,
                mail:data.mail,
                pass:data.pass
            })
            .then(
                (response)=>{
                    console.log(response);
                    if(response.status === 200){
                    swal({
                        title: "Datos Guardados con exito",
                        text: "Registrado en el sistema",
                        icon: "success",
                        button: "Continuar",
                    });
                    }
                }
            ).catch((error)=>{
                    swal({
                        title: "Correo en uso",
                        text: "Correo ya registrado en el sistema",
                        icon: "warning",
                        button: "Volver",
                    });
            })
        }else{
            swal({
                title: "Las contraseñas no coinciden",
                text: "Revisar si las contraseñas son iguales",
                icon: "warning",
                button: "Volver",
            });
        }
    }
    console.log(errors)

    return(
        <div center >
            <h1>Crear nuevo usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>

            <TextField id="outlined-basic" label="Nombres" variant="outlined" name="rut" inputRef={register} /> 
            <TextField id="outlined-basic1" label="E-mail" variant="outlined" name="nombre" inputRef={register} /> 
            <TextField id="outlined-basic2" label="Contraseña" variant="outlined" name="apellido" inputRef={register} /> 
            <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="passConfirm"
                    label="Confirmar Contraseña"
                    type="password"
                    id="passConfirm"
                    autoComplete="current-password"
                    inputRef={register}
                />

            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            >
            Enviar
            </Button>
            </form>
        </div>
    )

}