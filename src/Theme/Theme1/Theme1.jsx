import React, { useContext } from 'react'
import { Heading, Text, Box, Badge} from '@chakra-ui/react'
import './theme1.css'
import { ImLocation } from 'react-icons/im'
import { GrMail } from 'react-icons/gr'
import { BsFillTelephoneFill } from 'react-icons/bs'
import ResumeContext from '../../Context/ResumeContext'

const Theme1 = (props) => {
    const { checkProj, checkWork, checkAward, themeData } = useContext(ResumeContext)
    const { componentRef } = props;
    const { name, profile, address, phone, email, skill, summary } = themeData.personalData;
    const { projectTitles, projectDesc } = themeData.projectData || {};
    const { educationTitles, educationDesc } = themeData.educationData || {};
    const { workTitles, workDesc } = themeData.workData || {};
    const { awards } = themeData.awardData || {};

    return (
        <>
            <Box id="section-to-print" ref={componentRef}>
                <Box _dark={{ border: '1px solid white' }} id="theme1">
                    {/* Personal Info  */}
                    <header id='info' className='text-center mt-2'>
                        {
                            name &&
                            <>
                                <Heading as='h2' size='2xl' className='mb-2'>
                                    {name}
                                </Heading>
                            </>
                        }
                        <Text fontSize='md' className='text-muted my-1 '>
                            {address && 
                                <><span className='mx-2'><ImLocation className='d-inline mx-1' />{address}</span>|</>
                            }
                            {
                                email &&
                                <>
                                    <span className='mx-2'><GrMail className='d-inline mx-1' />{email}</span>|
                                </>
                            }
                            {
                                phone &&
                                <>
                                    <span className='mx-2'><BsFillTelephoneFill className='d-inline mx-1' />{phone}</span>
                                </>
                            }
                        </Text>
                        {
                            summary &&
                            (<>
                                <Heading as='h3' size='md' className="mt-1 mb-2 text-center">
                                    <br></br>
                                    Summary:
                                </Heading>
                                <Text as='h4' size='md' className='text-center' style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                                    <p style={{width:'75%'}}>{summary}</p>
                                    <br></br>
                                </Text>
                            </>)
                        }
                        {
                            profile &&
                        (
                            <>
                                <Heading as='h3' size='md' className="mt-1 mb-2 text-center">
                                    <br></br>
                                    Work Profile:
                                </Heading>
                                <Text as='h4' size='md' className='text-center' style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                                    <p style={{width:'75%'}}>{profile}</p>
                                    <br></br>
                                </Text>
                            </>
                        )
                        }
                    </header>
                    {/* Skills Part  */}
                    {
                        skill &&
                        <>
                            <section id="skills" className='my-2'>
                                <Heading _dark={{ color: 'gray.800' }} bg={'#D2E4E1'} as='h3' size='md' px={20} py={2}>
                                    TECHNICAL SKILLS
                                </Heading>

                                <Box id='skills-set' className='basic-set d-flex justify-content-center align-items-center gap-5'>
                                    <Box className='skillBox'>
                                        {
                                            skill.split(',').map((element, index) => <Badge key={index} className='skill-badge' variant='solid'>{element}</Badge>)
                                        }
                                    </Box>
                                </Box>
                            </section>
                        </>
                    }

                    {/* Project Section  */}
                    {
                        !checkProj && projectTitles &&
                        <section id="projects" className='my-2'>
                            <Heading _dark={{ color: 'gray.800' }} bg={'#D2E4E1'} as='h3' size='md' px={20} py={2}>
                                PROJECTS
                            </Heading>

                            <Box id='project-set' className='basic-set'>
                                {
                                    Object.entries(projectTitles).map((element, index) => {
                                        return (
                                            <Box key={index} className="subBox">
                                                <Text className='sub-title'>{element[1]}</Text>
                                                <Box className='sub-details'>
                                                    {
                                                        (Object.entries(projectDesc)[index] === undefined)
                                                            ?
                                                            null
                                                            :
                                                            Object.entries(projectDesc)[index][1].split(',').map((element, index) => {
                                                                return <li key={index}>{element}</li>
                                                            })
                                                    }
                                                </Box>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </section>
                    }

                    {/* Education Part  */}
                    {
                        educationTitles &&
                        <>
                            <section id="education" className='my-2'>
                                <Heading _dark={{ color: 'gray.800' }} bg={'#D2E4E1'} as='h3' size='md' px={20} py={2}>
                                    EDUCATION
                                </Heading>

                                <Box id='education-set' className='basic-set'>
                                    {
                                        Object.entries(educationTitles).map((element, index) => {
                                            return (
                                                <Box key={index} className="subBox">
                                                    <Text className='sub-title'>{element[1]}</Text>
                                                    <Box className='sub-details'>
                                                        {
                                                            (Object.entries(educationDesc)[index] === undefined)
                                                                ?
                                                                null
                                                                :
                                                                Object.entries(educationDesc)[index][1].split(',').map((element, index) => {
                                                                    return <li key={index}>{element}</li>
                                                                })
                                                        }
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </section>
                        </>
                    }

                    {/* WORK EXPERIENCE  */}
                    {
                        !checkWork && typeof workTitles === 'object' &&
                        <section id="experience" className='my-2'>
                            <Heading _dark={{ color: 'gray.800' }} bg={'#D2E4E1'} as='h3' size='md' px={20} py={2}>
                                WORK EXPERIENCE
                            </Heading>

                            <Box id='experience-set' className='basic-set'>
                                {
                                    typeof workTitles === 'object' &&
                                    Object.entries(workTitles).map((element, index) => {
                                        return(
                                            <Box key={index} className="subBox">
                                                <Text className='sub-title'>{element[1]}</Text>
                                                <Box className='sub-details'>
                                                    {
                                                        (Object.entries(workDesc)[index] === undefined)
                                                            ?
                                                            null
                                                            :
                                                            Object.entries(workDesc)[index][1].split(',').map((element, index) => {
                                                                return <li key={index}>{element}</li>
                                                            })
                                                    }
                                                </Box>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </section>
                    }
                    {/* Award & Achievement */}
                    {
                        !checkAward && awards &&
                        <section id="awards" className='my-2'>
                            <Heading _dark={{ color: 'gray.800' }} bg={'#D2E4E1'} as='h3' size='md' px={20} py={2}>
                                AWARDS & ACHIEVEMENTS
                            </Heading>

                            <Box id='award-set' className='basic-set d-flex justify-content-between align-items-center'>
                                <Box>
                                    {
                                        awards.split(',').map((element, index) => {
                                            return <li key={index}>{element}</li>
                                        })
                                    }
                                </Box>
                            </Box>
                        </section>
                    }
                </Box>
            </Box>
        </>
    )
}

export default Theme1
