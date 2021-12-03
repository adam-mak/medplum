import { ElementDefinition, IndexedStructureDefinition } from '@medplum/core';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { BackboneElementInput, BackboneElementInputProps } from './BackboneElementInput';
import { MedplumProvider } from './MedplumProvider';
import { MockClient } from './MockClient';

const contactProperty: ElementDefinition = {
  id: 'Patient.contact',
  path: 'Patient.contact',
  type: [{
    code: 'BackboneElement'
  }],
  min: 0,
  max: '*'
};

const idProperty: ElementDefinition = {
  id: 'Patient.contact.id',
  path: 'Patient.contact.id',
  type: [{
    code: 'string'
  }],
  min: 0,
  max: '1'
};

const nameProperty: ElementDefinition = {
  id: 'Patient.contact.name',
  path: 'Patient.contact.name',
  type: [{
    code: 'HumanName'
  }],
  min: 0,
  max: '1'
};

const schema: IndexedStructureDefinition = {
  types: {
    Patient: {
      display: 'Patient',
      properties: {
        contact: contactProperty
      }
    },
    PatientContact: {
      display: 'Patient Contact',
      properties: {
        id: idProperty,
        name: nameProperty
      }
    }
  }
};

const medplum = new MockClient({});

describe('BackboneElementInput', () => {

  const setup = (args: BackboneElementInputProps) => {
    return render(
      <MemoryRouter>
        <MedplumProvider medplum={medplum}>
          <BackboneElementInput {...args} />
        </MedplumProvider>
      </MemoryRouter>
    );
  };

  test('Renders', () => {
    setup({
      schema,
      property: contactProperty,
      name: 'contact'
    });
    expect(screen.getByText('Name')).toBeDefined();
  });

});
