import React from 'react';
import PanelGrid from './panelGrid';
import SelectCheckListBox from '../selectListBox/selectCheckListBox';
import SelectOneListBox from '../selectListBox/selectOneListBox';
import { useSelectChange } from '../../../context/SelectChangeContext';
import InputText from '../inputText/inputText';
import DatePicker from '../datePicker/datePicker';
import DatePickerHour from '../datePicker/datePickerHour';
import Check from '../check/checkGroup';
import Form from '../form';

function PanelGridDemo() {
    return (
        <Form>
            <PanelGrid
                title={'Bir Adet Panel Başlığı'}
                backgroundColor='blue'
                width={'100'}
                overlayOpacity={0.2}
                columns={5}
                columnWidth={0}
                height={800}
            >
                <SelectOneListBox
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyet'}
                    onChange={useSelectChange()}
                    labeltext={'Branş'}
                    placeholder="Select "
                    backgroundColor={'white'}
                    // padding={'3%'}
                    width={'10%'}
                    //borderWidth={'9px'}
                    borderColor={'#ccc'}
                    hardInput={true}
                    isSearchable={true}
                    defaultValue={'H'}
                />

                <SelectCheckListBox
                    id={"ChecList"}
                    reqGet={'/UHaslib/cinsiyet'}
                    name={'cinsiyetsss'}
                    onChange={useSelectChange()}
                    labeltext={'CheckListhandleSelectChange'}
                    placeholder="Seçiniz"
                    backgroundColor={'white'}
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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
                    borderColor={'#ccc'}
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

                <DatePicker
                    label="AtakanDatePicker"
                    selected={"selectedDate"}
                    onChange={useSelectChange()}
                    dateFormat="yyyy-MM-dd"
                    required={true}
                />

                <DatePickerHour
                    label="AtakanDatePicker"
                    selected={"selectedDate"}
                    onChange={useSelectChange()}
                    dateFormat="yyyy-MM-dd"
                    required={true}
                />

                <Check
                    item ={[
                        { name: "New York", value: "N" },
                        { name: "London", value: "L" },
                        { name: "Paris", value: "P" },
                        { name: "Tokyo", value: "T" },
                        { name: "Berlin", value: "B" },
                        { name: "Rome", value: "R" },
                        { name: "Madrid", value: "M" },
                        { name: "Dubai", value: "D" },
                        { name: "Istanbul", value: "I" }
                    ]}
                    label="Atakan"
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
                    borderColor={'black'}
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
