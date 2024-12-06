import React from 'react';
import PanelGrid from './panelGrid';
import SelectCheckListBox from '../selectListBox/selectCheckListBox';
import { useSelectChange } from '../../../context/SelectChangeContext';
import InputText from '../inputText/inputText';
import Form from '../form';

function PanelGridDemo() {
    return (
        <Form>
            <PanelGrid
                title={'Bir Adet Panel Başlığı'}
                backgroundColor='blue'
                width={'100'}
                overlayOpacity={0.2}
                columns={3}
                columnWidth={0}
                height={10}
            >
                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'CheckListhandleSelectChange'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />

                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />

                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />


                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />


                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />


                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />


                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />


                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />

                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />

                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'Atakan'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />

                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'CheckListhandleSelectChange'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'green'}
                    hardInput={true}
                    isSearchable={true}
                    dset={'/Login/stringDeger'}
                    required={true}
                />

                <InputText
                    label="Atakan"
                    id="username1"
                    required={true}
                    dset={'cinsiyet'}
                    visible={true}
                    defaultValue={'K'}
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
                    onChange={useSelectChange()}
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
