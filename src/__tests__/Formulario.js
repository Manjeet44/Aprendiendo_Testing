import React from 'react';
import {render, screen} from '@testing-library/react'
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn();

test('<Formulario /> Cargar el formulario y revisar que todo este correcto', () => {
    //const wrapper = render(<Formulario/>);
    render(<Formulario crearCita={crearCita} />);
    expect(screen.getByText('Crear Cita')).toBeInTheDocument();

    //Heading
    const titulo = screen.getByTestId('titulo')
    expect(titulo.tagName).toBe('H2');
    expect(titulo.tagName).not.toBe('H1');

    expect(titulo.textContent).toBe('Crear Cita');

    //Boton
    const btn = screen.getByTestId('btn-submit');
    expect(btn.tagName).toBe('BUTTON');
    expect(btn.textContent).toBe('Agregar Cita');
    expect(btn.textContent).not.toBe('Agregar Nueva Cita');

});

test('<Formulario/> Validacion de formulario', () => {
    render(<Formulario crearCita={crearCita} />);
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    //Revisar por la alerta
    const alerta = screen.getByTestId('alerta');
    expect(alerta).toBeInTheDocument();
    expect(alerta.textContent).toBe('Todos los campos son obligatorios');
    expect(alerta.tagName).toBe('P');
    expect(alerta.tagName).not.toBe('BUTTON');
});

test('<Formulario/> Validacion de formulario', () => {
    render(<Formulario crearCita={crearCita} />);

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

    //Crear cita y comprobar que la funcion sea llamada
    expect(crearCita).toHaveBeenCalled();
    expect(crearCita).toHaveBeenCalledTimes(1);

});