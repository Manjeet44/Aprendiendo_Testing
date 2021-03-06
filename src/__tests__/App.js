import React from 'react';
import {render, screen} from '@testing-library/react'
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('<App/> La aplicacion funciona bien', () => {
    render(<App/>);

    expect(screen.getByText('Administrador de Pacientes')).toBeInTheDocument();
    expect(screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes');
    expect(screen.getByTestId('nombre-app').tagName).toBe('H1');

    expect(screen.getByText('Crear Cita')).toBeInTheDocument();
    expect(screen.getByText('No hay citas')).toBeInTheDocument();


});

test('<App/> Agregar una cita y verificar el Heading', () => {
    render(<App/>);

    userEvent.type(screen.getByTestId('mascota'), 'Hook');
    userEvent.type(screen.getByTestId('propietario'), 'Andreu');
    userEvent.type(screen.getByTestId('fecha'), '2022-10-10');
    userEvent.type(screen.getByTestId('hora'), '10:30');
    userEvent.type(screen.getByTestId('sintomas'), 'No duerme');

    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    //Revisar por la alerta
    const alerta = screen.queryByTestId('alerta');
    expect(alerta).not.toBeInTheDocument();

    //Revisar aqui por el titulo dinamico
    expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas')
    expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas')
});

test('<App/> Verificar las Citas en el DOM', async() => {
    render(<App/>);
    const citas = await screen.findAllByTestId('cita');

    //Snapshoot crea un archivo para verificar su contenido
    //expect(citas).toMatchSnapshot();
    expect(screen.getByTestId('btn-eliminar').tagName).toBe('BUTTON');
    expect(screen.getByTestId('btn-eliminar')).toBeInTheDocument();

    //Verificar alguna cita
    expect(screen.getByText('Hook')).toBeInTheDocument();
});

test('<App/> Elimina la cita', () => {
    render(<App/>);
    //Simular el click
    const btnEliminar = screen.getByTestId('btn-eliminar');
    expect(btnEliminar.tagName).toBe('BUTTON');
    expect(btnEliminar).toBeInTheDocument();
    userEvent.click(btnEliminar)

    expect(btnEliminar).not.toBeInTheDocument();
    expect(screen.queryByText('Hook')).not.toBeInTheDocument();
    expect(screen.queryByText('cita')).not.toBeInTheDocument();
});