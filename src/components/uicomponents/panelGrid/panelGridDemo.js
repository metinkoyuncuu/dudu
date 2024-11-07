import React from 'react';
import PanelGrid from './panelGrid';
import InputText from '../inputText';
import SelectOneListBox from '../selectOneListBox';
import SelectCheckListBox from '../selectCheckListBox';


function PanelGridDemo() {
    return (
        <PanelGrid
      title={'Bir Adet Panel Başlığı'}
      backgroundColor='blue'
      width={'100'}
      overlayOpacity={0.2}
      columns={6}
      columnWidth={3}
      height={400}
    >
      <InputText
                    id="CALAD"
                    label="Çalışan Adı"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                    defaultValue={'K'}
                />

                <InputText
                    label="Atakan"
                    id="username1"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                    defaultValue={'K'}
                />

                <InputText
                    id="SIRKETAD"
                    label="Şirket Adı"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />

                <InputText
                    id="SIRKETAD2"
                    label="Şirket Adı2"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />

                <InputText
                    id="SIRKETAD3"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />

                <InputText
                    id="SIRKETAD7"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />

                <InputText
                    id="SIRKETAD4"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />

                <InputText
                    id="SIRKETAD5"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />

                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />
                <InputText
                    id="SIRKETAD6"
                    label="Şirket Adı3Şirket Adı3"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                />

      {/* Other input fields */}
      <SelectOneListBox
        reqGet={'/UHaslib/cinsiyet'}
        name={'cinsiyet'}
        onChange={"handleSelectChange"}
        labeltext={'OneListhandleSelectChange'}
        placeholder="Select "
        backgroundColor={'white'}
        width={'100%'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}
        defaultValue={'H'}       
      />
      <SelectCheckListBox
        id={"ChecList"}
        reqGet={'/UHaslib/cinsiyet'}
        name={'cinsiyetsss'}
        onChange={"handleSelectChange"}
        labeltext={'CheckListhandleSelectChange'}
        placeholder="Select"
        backgroundColor={'white'}
        width={'100%'}
        borderColor={'green'}
        hardInput={true}
        isSearchable={true}
        dset={'/Login/stringDeger'}
        required={true}
      />
    </PanelGrid>
  );
}

export default PanelGridDemo;