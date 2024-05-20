import React, { useContext, useEffect, useState } from 'react'
import './userCollectData.css'
import { IoMdCloudUpload } from 'react-icons/io'
import { FormControl, Input, Heading, Textarea, Button, Switch} from '@chakra-ui/react'
import ResumeContext from '../../Context/ResumeContext'


const UserDataCollect = () => {
    const { themeData, checkAward, setCheckAward, setThemeData, checkProj, checkWork, setCheckProj, setCheckWork, initialData } = useContext(ResumeContext)
    if (!themeData) {
        setThemeData(initialData)
    }

    const [profileImage, setProfileImage] = useState(themeData.personalData.profileImage);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const [projectCount, setProjectCount] = useState(0)
    const [educationCount, setEducationCount] = useState(0)
    const [workCount, setWorkCount] = useState(0)
    const [projArrTemplate, setProjArrTemplate] = useState([])
    const [educationArrTemplate, setEducationArrTemplate] = useState([])
    const [workArrTemplate, setWorkArrTemplate] = useState([])
    const [projectData, setProjectData] = useState({ 
        'projectTitles': themeData.projectData ? themeData.projectData.projectTitles : {}, 
        'projectDesc': themeData.projectData? themeData.projectData.projectDesc : {}
    })
    const [educationData, setEducationData] = useState({
        'educationTitles': themeData.educationData ? themeData.educationData.educationTitles : {},
        'educationDesc': themeData.educationData ? themeData.educationData.educationDesc : {}
    })
    const [workData, setWorkData] = useState({
        'workTitles': themeData.workData ? themeData.workData.workTitles : {},
        'workDesc': themeData.workData ? themeData.workData.workDesc : {}
    })
    const [personalData, setPersonalData] = useState({
        profileImage: themeData.personalData.profileImage,
        name: themeData.personalData.name,
        summary: themeData.personalData.summary,
        profile: themeData.personalData.profile,
        address: themeData.personalData.address,
        phone: themeData.personalData.phone,
        email: themeData.personalData.email,
        skill: themeData.personalData.skill,
    })
    const [awardData, setAwardData] = useState({
        awards: themeData.awardData ? themeData.awardData.awards : ''
    })
    // To Add Personal Data to the State
    useEffect(() => {
        setPersonalData({ ...personalData, profileImage: profileImage })
    }, [profileImage, setPersonalData, personalData])

    const handleChangePersonal = (e) => {
        const { name, value } = e.target
        setPersonalData({ ...personalData, [name]: value })
    }
    // To Add Project Data to the State
    const handleChangeProject = (e) => {
        const { name, value, id } = e.target
        let tempProjectData = projectData
        if (name.includes('pName')) {
            tempProjectData["projectTitles"][id] = value;
        } else {
            tempProjectData["projectDesc"][id] = value;
        }
        setProjectData({ ...projectData, tempProjectData })
        setThemeData({ ...themeData, projectData: projectData })
    }

    const handleProjectClick = (e) => {
        e.preventDefault();
        let i = projectCount
        ++i;
        const template = (
            <>
                <FormControl isRequired className='my-2'>
                    <Input disabled={checkProj} id={`pTitle${i}`} name='pName' onChange={handleChangeProject} type={'text'} placeholder='Enter Project Title' />
                </FormControl>
                <FormControl isRequired className='my-2'>
                    <Textarea disabled={checkProj} id={`pDescription${i}`} name='pDescription' onChange={handleChangeProject} placeholder='Use comma to separate Description' />
                </FormControl>
            </>
        )
        let arr = projArrTemplate
        arr.push(template)
        setProjArrTemplate(arr)
        setProjectCount(i)
    }

    // To Add Education Data to the State
    const handleChangeEducation = (e) => {
        const { name, value, id } = e.target
        let tempEducationData = educationData
        if (name.includes('eName')) {
            tempEducationData["educationTitles"][id] = value;
        } else {
            tempEducationData["educationDesc"][id] = value;
        }
        setEducationData({ ...educationData }, tempEducationData)
    }
    const handleEducationClick = (e) => {
        e.preventDefault();
        let i = educationCount
        ++i;
        const template = (
            <>
                <FormControl isRequired className='my-2'>
                    <Input id={`eTitle${i}`} name='eName' onChange={handleChangeEducation} type={'text'} placeholder='Enter Title' />
                </FormControl>
                <FormControl isRequired className='my-2'>
                    <Textarea id={`eDescription${i}`} name='eDescription' onChange={handleChangeEducation} placeholder='Use comma to separate Description' />
                </FormControl>
            </>
        )
        let arr = educationArrTemplate
        arr.push(template)
        setEducationArrTemplate(arr)
        setEducationCount(i)
    }

    // To Add Work Data to the State
    const handleChangeWork = (e) => {
        const { name, value, id } = e.target
        let tempWorkData = workData
        if (name.includes('wName')) {
            tempWorkData["workTitles"][id] = value;
        } else {
            tempWorkData["workDesc"][id] = value;
        }
        setWorkData({ ...workData }, tempWorkData)
    }
    const handleWorkClick = (e) => {
        e.preventDefault();
        let i = workCount
        ++i;
        const template = (
            <>
                <FormControl isRequired className='my-2'>
                    <Input id={`wTitle${i}`} name='wName' onChange={handleChangeWork} type={'text'} placeholder='Enter Job Title' />
                </FormControl>
                <FormControl isRequired className='my-2'>
                    <Textarea id={`wDescription${i}`} name='wDescription' onChange={handleChangeWork} placeholder='Use comma to separate Description' />
                </FormControl>
            </>
        )
        let arr = workArrTemplate
        arr.push(template)
        setWorkArrTemplate(arr)
        setWorkCount(i)
    }

    // To Add Award & Achievement Data to the State
    const handleChangeAwards = (e) => {
        const { name, value } = e.target
        setAwardData({ ...awardData, [name]: value })
    }
    useEffect(() => {
        setThemeData({ ...themeData, personalData, projectData, educationData, workData, awardData })
    }, [personalData, projectData, educationData, workData, awardData, setThemeData, themeData])

    const handleDeleteEducation = (index) => {
        const arr = [...educationArrTemplate];
        if(index <= 0){
            setEducationArrTemplate([]);
            setEducationCount(0);
            setEducationData({educationTitles: {}, educationDesc: {}});
            return;
        }
        arr.splice(index, 1);
        setEducationArrTemplate(arr);
        setEducationCount(educationCount - 1);
    
        // Remove the corresponding data from educationData
        const updatedEducationData = { ...educationData };
        delete updatedEducationData.educationTitles[`eTitle${index + 1}`];
        delete updatedEducationData.educationDesc[`eDescription${index + 1}`];
        setEducationData(updatedEducationData);
    }

    const handleDeleteProject = (index) => {
        const arr = [...projArrTemplate];
        if(index <= 0){
            setProjArrTemplate([]);
            setProjectCount(0);
            setProjectData({projectTitles: {}, projectDesc: {}});
            return;
        }
        arr.splice(index, 1);
        setProjArrTemplate(arr);
        setProjectCount(projectCount - 1);
    
        // Remove the corresponding data from projectData
        const updatedProjectData = { ...projectData };
        delete updatedProjectData.projectTitles[`pTitle${index + 1}`];
        delete updatedProjectData.projectDesc[`pDescription${index + 1}`];
        setProjectData(updatedProjectData);
    }
    
    const handleDeleteWork = (index) => {
        const arr = [...workArrTemplate];
        if(index <= 0){
            setWorkArrTemplate([]);
            setWorkCount(0);
            setWorkData({workTitles: {}, workDesc: {}});
            return;
        }
        arr.splice(index, 1);
        setWorkArrTemplate(arr);
        setWorkCount(workCount - 1);
    
        // Remove the corresponding data from workData
        const updatedWorkData = { ...workData };
        delete updatedWorkData.workTitles[`wTitle${index + 1}`];
        delete updatedWorkData.workDesc[`wDescription${index + 1}`];
        setWorkData(updatedWorkData);
    }
    

    return (
        <>
            <div id="form-collect">
                {/* Personal Details Area  */}
                <div id="form-personal" className='mb-2'>
                    <Heading as='h4' size='md' className='mb-2'>
                        Personal Details
                    </Heading>
                    <hr />

                    <FormControl isRequired className='my-2'>
                        <div className='file'>
                            <label htmlFor='input-file'>
                                <i className="material-icons"><IoMdCloudUpload size={30} />
                                </i>Select a file
                            </label>
                            <input accept="image/*" name='profileImage' onChange={handleImageUpload} id='input-file' type='file' />
                            <img className="abc" src={profileImage} alt="your profile preview" />
                        </div>
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='name' onChange={handleChangePersonal} type={'text'} placeholder='Your Name' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='summary' onChange={handleChangePersonal} type={'text'} placeholder='Your Summary' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='profile' onChange={handleChangePersonal} type={'text'} placeholder='Work Profile' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='address' onChange={handleChangePersonal} type={'text'} placeholder='Address' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='phone' onChange={handleChangePersonal} type={'tel'} placeholder='Phone number' />
                    </FormControl>
                    <FormControl isRequired className='my-2'>
                        <Input name='email' onChange={handleChangePersonal} type={'email'} placeholder='Email id' />
                    </FormControl>
                </div>

                {/* Skills Area  */}
                <div id="form-personal" className='mb-2'>
                    <Heading as='h4' size='md' className='my-2'>
                        Technical Skills
                    </Heading>
                    <hr />

                    <FormControl isRequired className='my-2'>
                        <Input name='skill' onChange={handleChangePersonal} type={'text'} placeholder='Separate skills by comma' />
                    </FormControl>
                </div>

                {/* Education Area  */}
                <div id="form-personal" className='mb-2'>
                    <Heading as='h4' size='md' className='my-2'>
                        Education
                    </Heading>
                    <hr />
                    <Button onClick={handleEducationClick} className='my-3 w-100' colorScheme='teal' variant='solid'>Add Education</Button>
                    {
                        (educationCount > 0) ? educationArrTemplate.map((element, index) => (
                            <div key={index}>
                                {element}
                                <Button onClick={() => handleDeleteEducation(index)} className='mt-2' colorScheme='red' variant='solid'>Delete Education</Button>
                            </div>
                        )) : null
                    }
                </div>

                {/* Projects Area  */}
                <div id="form-personal" className='mb-2'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Heading as='h4' size='md' className='my-2'>
                            Projects
                        </Heading>
                        <Switch defaultChecked={!checkProj} onChange={() => (setCheckProj(!checkProj))} colorScheme='teal' />
                    </div>
                    <hr />
                    <Button disabled={checkProj} onClick={handleProjectClick} className='my-3 w-100' colorScheme='teal' variant='solid'>Add Projects</Button>
                    {
                        (projectCount > 0) ? projArrTemplate.map((element, index) => (
                            <div key={index}>
                                {element}
                                <Button onClick={() => handleDeleteProject(index)} className='mt-2' colorScheme='red' variant='solid'>Delete Project</Button>
                            </div>
                        )) : null
                    }
                </div>

                {/* Work Experience Area  */}
                <div id="form-personal" className='mb-2'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Heading as='h4' size='md' className='my-2'>
                            Work Experience
                        </Heading>
                        <Switch defaultChecked={!checkWork} onChange={() => (setCheckWork(!checkWork))} colorScheme='teal' />
                    </div>
                    <hr />
                    <Button disabled={checkWork} onClick={handleWorkClick} className='my-3 w-100' colorScheme='teal' variant='solid'>Add Experience</Button>
                    {
                        (workCount > 0) ? workArrTemplate.map((element, index) => (
                            <div key={index}>
                                {element}
                                <Button onClick={() => handleDeleteWork(index)} className='mt-2' colorScheme='red' variant='solid'>Delete Work</Button>
                            </div>
                        )) : null
                    }
                </div>

                {/* Awards & Achievement  */}
                <div id="form-personal" className='mb-2'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <Heading as='h4' size='md' className='my-2'>
                            Awards & Achievement
                        </Heading>
                        <Switch defaultChecked={!checkAward} onChange={() => (setCheckAward(!checkAward))} colorScheme='teal' />
                    </div>
                    <hr />
                    <FormControl isRequired className='my-2'>
                        <Textarea name='awards' disabled={checkAward} onChange={handleChangeAwards} placeholder='Use comma to separate Achievement' />
                    </FormControl>
                </div>

            </div>
        </>
    )
}

export default UserDataCollect