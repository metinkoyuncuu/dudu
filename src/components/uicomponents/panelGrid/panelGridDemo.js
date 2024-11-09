import React from 'react';
import PanelGrid from './panelGrid';
import InputText from '../inputText/inputText';
import SelectCheckListBox from '../selectListBox/selectCheckListBox';
import SelectOneListBox from '../selectListBox/selectOneListBox';
import Form from '../form';

function PanelGridDemo() {
    return (
     <Form>
        <PanelGrid
            title={'Bir Adet Panel Başlığı'}
            backgroundColor='blue'
            width={'100'}
            overlayOpacity={0.2}
            columns={6}
            columnWidth={3}
            height={400}
        >
            <SelectCheckListBox
                id={"ChecList"}
                reqGet={'/UHaslib/cinsiyet'}
                name={'cinsiyetsss'}
                onChange={"handleSelectChange"}
                labeltext={'CheckListhandleSelectChange'}
                placeholder="Seçiniz"
                backgroundColor={'white'}
                borderColor={'green'}
                hardInput={true}
                isSearchable={true}
                dset={'/Login/stringDeger'}
                required={true}
            />
        </PanelGrid>

            <PanelGrid
            title={'Atakan'}
            backgroundColor='blue'
            width={'100'}
            overlayOpacity={0.2}
            columns={6}
            columnWidth={3}
            height={400}
            >
            <SelectCheckListBox
                id={"ChecList"}
                reqGet={'/UHaslib/cinsiyet'}
                name={'cinsiyetsss'}
                onChange={"handleSelectChange"}
                labeltext={'CheckListhandleSelectChange'}
                placeholder="Seçiniz"
                backgroundColor={'white'}
                borderColor={'green'}
                hardInput={true}
                isSearchable={true}
                dset={'/Login/stringDeger'}
                required={true}
            />
        </PanelGrid>
     </Form>  
    );
}

export default PanelGridDemo;