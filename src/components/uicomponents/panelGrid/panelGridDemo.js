import React, { useState } from 'react';
import PanelGrid from './panelGrid';
import SelectCheckListBox from '../selectListBox/selectCheckListBox';
import SelectOneListBox from '../selectListBox/selectOneListBox';
import { useSelectChange } from '../../../context/SelectChangeContext';
import InputText from '../inputText/inputText';
import DatePicker from '../datePicker/datePicker';
import DatePickerHour from '../datePicker/datePickerHour';
import Check from '../check/checkGroup';
import CheckOne from '../check/CheckOne';
import RadioGroup from '../radio/radioGroup';
import PickList from '../pickList/pickList';
import TextEditor from '../textEditor/textEditor';
import DataGrid from '../dataGrid/dataGrid';
import Form from '../form';

function PanelGridDemo() {

    const cities = [
        { id: 1, name: "London" },
        { id: 2, name: "Paris" },
        { id: 3, name: "Istanbul" },
        { id: 4, name: "Berlin" },
        { id: 5, name: "Barcelona" },
        { id: 6, name: "Rome" },
    ];
    const fetchData = async (page, rowsPerPage) => {
        // API'den verileri al (örnek veri)
        const data = [
            { name: 'Jane', country: 'Canada', company: 'XYZ Ltd.', atakan: 'Hayal', representative: 'Bob' },
            { name: 'John', country: 'USA', company: 'ABC Inc.', atakan: 'Atakan', representative: 'Alice' },
            { name: 'Jane', country: 'TURK', company: 'TEST1.', atakan: 'Veciha', representative: 'Bob' },
            { name: 'Jane', country: 'IRAN', company: 'TEST2.', atakan: 'Ecehan', representative: 'Bob' },
            { name: 'Jane', country: 'RUS', company: 'TEST3.', atakan: 'Enis', representative: 'Bob' },

        ];
        return data;
    };

    return (
        <Form>
            <PanelGrid
                title={'Bir Adet Panel Başlığı'}
                backgroundColor='blue'
                width={'100'}
                overlayOpacity={0.2}
                columns={5}
                columnWidth={0}
                height={1500}
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
                    required={false}
                    dset={'cinsiyet'}
                    visible={true}
                    defaultValue={'K'}
                    toggleMask={false}
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
                    reqGet={'/UHaslib/cinsiyet'}
                    item={[
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

                <CheckOne
                    item={[
                        { name: "Erkek", value: "E" },
                    ]}
                />

                <CheckOne
                    item={[
                        { name: "Kadın", value: "K" },
                    ]}
                />

                <RadioGroup
                    item={[
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


                <PickList value={cities}
                    varName="city"
                    itemLabel="name"
                    itemValue="id" />


                <TextEditor
                    widgetVar="editor1"
                    varName="editorContent"
                    value="<p>Merhaba Dünya!</p>"
                    height="210px"
                    width="1800px"
                />

                <DataGrid
                    fetchData={fetchData}
                    columns={[
                        { header: 'Name', field: 'name', sortable: true, filterable: true},
                        { header: 'Country', field: 'country', sortable: true, filterable: true},
                        { header: 'Company', field: 'company', sortable: true, filterable: false}, // hidden column
                        { header: 'Atakan', field: 'atakan', sortable: true, filterable: true}
                    ]}
                    gridWidth="98%"
                    gridPosition={{ x: '20px', y: '1050px' }}
                    fileName="hayal" 
                    rowsPerPage={1}
                />


            </PanelGrid>


        </Form>
    );
}

export default PanelGridDemo;
