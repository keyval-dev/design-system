'use client';
import React, { useState } from 'react';
import { Card } from '../design.system/card/card';
import { Text } from '../design.system/text/text';
import { Input, Loader, Modal, SegmentedControls, Tag } from '..';
import { ModalPositionX, ModalPositionY } from '@/design.system/modal/types';
export default function Home() {
  const [selected, setSelected] = useState('sources');

  const options = [
    {
      label: 'Sources',
      id: 'sources',
    },
    {
      label: 'Namespaces',
      id: 'namespaces',
    },
  ];
  const modalConfig = {
    title: 'Create new token',
    showHeader: true,
    showOverlay: true,
    positionX: ModalPositionX.center,
    positionY: ModalPositionY.center,
    padding: '20px',
    footer: {
      primaryBtnText: 'Create',
      primaryBtnAction: () => {},
    },
  };

  return (
    <div style={{ background: '#0E1C28' }}>
      {/* <Modal show={true} config={modalConfig} closeModal={() => {}}>
        <Input
          style={{ width: '98%' }}
          label="Token name"
          value={''}
          placeholder="Name of the token"
          onChange={(value) => {}}
        />
      </Modal> */}

      <Card
        type={'secondary'}
        header={{
          body: () => (
            <div
              style={{
                width: 600,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            ></div>
          ),
        }}
      >
        <SegmentedControls
          options={options}
          selected={selected}
          onChange={function (selected: string): void {
            setSelected(selected);
          }}
        />
        <Loader width={100} height={100} />
        <Tag title={'#tag'} />
        <div style={{ width: 600, height: 600 }}></div>
      </Card>
    </div>
  );
}
