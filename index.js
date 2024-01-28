const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// API

const towns = require('./api/towns.json')

// schemas

const Profiles = require('./schemas/Profiles')  
const Lectures = require('./schemas/Lectures')  
const Practices = require('./schemas/Practices')  
const Vacancies = require('./schemas/Vacancies')  
const Tutors = require('./schemas/Tutors')  

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id} = require('./microservices/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@web-2024.v43n3ay.mongodb.net/IT-Field'

// middlewares

middleware(app)
mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Query {
        test: String!
    }
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!,
        field: String!,
        course: Float!
    }
    type AccountComponent {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Project {
        shortid: String!,
        title: String!,
        category: String!,
        language: String!,
        url: String!,
        image: String!,
        likes: Float!
    }
    type Result {
        shortid: String!,
        title: String!,
        category: String!,
        semester: Float!,
        format: String!,
        percent: Float!
    }
    type Conspect {
        shortid: String!,
        name: String!,
        text: String!,
        format: String!,
        timestamp: Float!,
        image: String!,
        likes: Float!
    }
    type Source {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        url: String!
    }
    type Member {
        account_id: String!,
        username: String!,
        role: String!,
        character: String!
    }
    type Task {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        level: String!,
        deadline: String!,
        status: String!,
        image: String!,
        likes: Float!
    }
    type Question {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        level: String!,
        answer: String!,
        accepted: Boolean!
    }
    type Photo {
        shortid: String!,
        title: String!,
        format: String!,
        image: String!,
        dateUp: String!,
        likes: Float!
    }
    type Quote {
        shortid: String!,
        text: String!,
        category: String!,
        subject: String!,
        likes: Float!
    }
    type Review {
        shortid: String!,
        name: String!,
        criterion: String!,
        period: String!,
        rating: Float!
    }
    type Tutor {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        fullname: String!,
        category: String!,
        institution: String!,
        subjects: [String]!,
        region: String!,
        cords: Cord!,
        url: String!,
        grade: Float!,
        image: String!,
        quotes: [Quote]!,
        reviews: [Review]!
    }
    type Vacancy {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        position: String!,
        region: String!,
        cords: Cord!,
        experience: Float!,
        url: String!,
        questions: [Question]!,
        photos: [Photo]!
    }
    type Practice {
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        university: String!,
        faculty: String!,
        semester: Float!,
        invite_code: String!,
        weekday: String!,
        region: String!,
        cords: Cord!,
        members: [Member]!,
        tasks: [Task]!
    }
    type Lecture {
        id: ID!,
        shortid: String!,
        account_id: String!,
        username: String!,
        title: String!,
        category: String!,
        university: String!,
        subject: String!,
        course: Float!,
        criterion: String!,
        rating: Float!,
        conspects: [Conspect]!,
        sources: [Source]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        security_code: String!,
        link_type: String!,
        link_content: String!,
        field: String!,
        course: Float!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        projects: [Project]!,
        results: [Result]!,
        account_components: [AccountComponent]!
    }
    type Mutation {
        register(username: String!, security_code: String!, link_type: String!, link_content: String!, field: String!, course: Float!, region: String!, cords: ICord!, main_photo: String!) : UserCookie!
        login(security_code: String!) : UserCookie!
        getProfiles(username: String!) : [Profile]!
        getProfile(account_id: String!) : Profile
        updateProfilePersonalInfo(account_id: String!, main_photo: String!) : String!
        updateProfileGeoInfo(account_id: String!, region: String!, cords: ICord!) : String!
        updateProfileStudyInfo(account_id: String!, link_type: String!, link_content: String!, field: String!, course: Float!) : String!
        updateProfileSecurityCode(account_id: String!, security_code: String!) : String!
        manageProfileProject(account_id: String!, option: String!, title: String!, category: String!, language: String!, url: String!, image: String!, coll_id: String!) : String!
        manageProfileResult(account_id: String!, option: String!, title: String!, category: String!, semester: Float!, format: String!, percent: Float!, coll_id: String!) : String!
        createLecture(username: String!, id: String!, title: String!, category: String!, university: String!, subject: String!, course: Float!, criterion: String!, rating: Float!) : String!
        getLectures(username: String!) : [Lecture]!
        getLecture(username: String!, shortid: String!) : Lecture!
        manageLectureConspect(username: String!, id: String!, option: String!, text: String!, format: String!, timestamp: Float!, image: String!, coll_id: String!) : String!
        updateLectureInfo(username: String!, id: String!, criterion: String!, rating: Float!) : String!
        makeLectureSource(username: String!, id: String!, title: String!, category: String!, url: String!) : String!
        createPractice(username: String!, id: String!, title: String!, category: String!, university: String!, faculty: String!, semester: Float!, invite_code: String!, weekday: String!, region: String!, cords: ICord!, role: String!) : String!
        getPractices(username: String!) : [Practice]!
        getPractice(username: String!, shortid: String!) : Practice!
        managePracticeStatus(username: String!, id: String!, option: String!, role: String!, invite_code: String!, coll_id: String!, character: String!) : String!
        updatePracticeInfo(username: String!, id: String!, invite_code: String!, weekday: String!) : String!
        managePracticeTask(username: String!, id: String!, option: String!, text: String!, category: String!, level: String!, deadline: String!, status: String!, image: String!, coll_id: String!) : String!
        createVacancy(username: String!, id: String!, title: String!, category: String!, position: String!, region: String!, cords: ICord!, experience: Float!, url: String!) : String!
        getVacancies(username: String!) : [Vacancy]!
        getVacancy(username: String!, shortid: String!) : Vacancy!
        manageVacancyQuestion(username: String!, id: String!, option: String!, text: String!, category: String!, level: String!, coll_id: String!, answer: String!) : String!
        manageVacancyPhoto(username: String!, id: String!, option: String!, title: String!, format: String!, image: String!, dateUp: String!, coll_id: String!) : String!
        createTutor(username: String!, id: String!, fullname: String!, category: String!, institution: String!, subjects: [String]!, region: String!, cords: ICord!, url: String!, grade: Float!, image: String!) : String!
        getTutors(username: String!) : [Tutor]!
        getTutor(username: String!, shortid: String!) : Tutor!
        manageTutorQuote(username: String!, id: String!, option: String!, text: String!, category: String!, subject: String!, coll_id: String!) : String!
        updateTutorInfo(username: String!, id: String!, grade: Float!, image: String!) : String!
        makeTutorReview(username: String!, id: String!, criterion: String!, period: String!, rating: Float!) : String!
    }
`

const resolvers = {
    Query: {
        test: () => 'Hi'
    },
    Mutation: {
        register: async (_, {username, security_code, link_type, link_content, field, course, region, cords, main_photo}) => {
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username, field, course}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    security_code,
                    link_type,
                    link_content,
                    field,
                    course,
                    region,
                    cords,
                    main_photo,
                    projects: [],
                    results: [],
                    account_components: []
                })

                drop_object = {account_id, username, field, course}
                
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {security_code}) => {
            const profile = await Profiles.findOne({security_code}) 
            let drop_object = {account_id: '', username: '', field: '', course: 1}
           
            if (profile) {  
                drop_object = {account_id: profile.account_id, username: profile.username, field: profile.field, course: profile.course}                       
            }

            return drop_object
        },
        getProfiles: async (_, {username}) => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfilePersonalInfo: async (_, {account_id, main_photo}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
        
                profile.main_photo = main_photo

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileGeoInfo: async (_, {account_id, region, cords}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.region = region
                profile.cords = cords
             
                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileStudyInfo: async (_, {account_id, link_type, link_content, field, course}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.link_type = link_type
                profile.link_content = link_content
                profile.field = field
                profile.course = course

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        updateProfileSecurityCode: async (_, {account_id, security_code}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.security_code = security_code

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        manageProfileProject: async (_, {account_id, option, title, category, language, url, image, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {
                   
                    let shortid = get_id()

                    profile.projects = [...profile.projects, {
                        shortid,
                        title,
                        category,
                        language,
                        url,
                        image,
                        likes: 0
                    }]

                    profile.projects = slicer(profile.projects, 40)

                } else if (option === 'delete') {
                    
                    profile.projects = profile.projects.filter(el => el.shortid !== coll_id)

                } else {

                    profile.projects.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'like') {
                                el.likes += 1
                            } else if (option === 'update') {   
                                el.image = image
                            }
                        }
                    })
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        manageProfileResult: async (_, {account_id, option, title, category, semester, format, percent, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.results = [...profile.results, {
                        shortid,
                        title,
                        category,
                        semester,
                        format,
                        percent
                    }]

                    profile.results = slicer(profile.results, 40)

                } else {

                    profile.results = profile.results.filter(el => el.shortid !== coll_id)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            }

            return 'Error'
        },
        createLecture: async (_, {username, id, title, category, university, subject, course, criterion, rating}) => {
            const profile = await Profiles.findOne({username, account_id: id}) 
            const lecture = await Lectures.findOne({username, title, category, university, subject, course, criterion, rating})
        
            if (profile && !lecture) {
                if (profile.account_components.filter(el => el.path === 'lecture').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'lecture'
                    }]

                    const newLecture = new Lectures({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        university,
                        subject,
                        course,
                        criterion,
                        rating,
                        conspects: [],
                        sources: []
                    })
                    
                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newLecture.save()

                    return 'Success'
                }
            }
            
            return 'Error'
        },
        getLectures: async (_, {username}) => {
            const lectures = await Lectures.find()

            return lectures
        },
        getLecture: async (_, {username, shortid}) => {
            const lecture = await Lectures.findOne({shortid})

            return lecture
        },
        manageLectureConspect: async (_, {username, id, option, text, format, timestamp, image, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const lecture = await Lectures.findOne({shortid: id})

            if (profile && lecture) {
                if (option === 'create') {

                    let shortid = get_id()

                    lecture.conspects = [...lecture.conspects, {
                        shortid,
                        name: profile.username,
                        text,
                        format,
                        timestamp,
                        image, 
                        likes: 0
                    }]

                    lecture.conspects = slicer(lecture.conspects, 40)

                } else if (option === 'like') {

                    lecture.conspects.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    lecture.conspects = lecture.conspects.filter(el => el.shortid !== coll_id)
                }

                await Lectures.updateOne({shortid: id}, {$set: lecture})

                return 'Success'
            }

            return 'Error'
        },
        updateLectureInfo: async (_, {username, id, criterion, rating}) => {
            const profile = await Profiles.findOne({username})
            const lecture = await Lectures.findOne({shortid: id})

            if (profile && lecture) {

                lecture.criterion = criterion
                lecture.rating = rating

                await Lectures.updateOne({shortid: id}, {$set: lecture})

                return 'Success'
            }

            return 'Error'
        },
        makeLectureSource: async (_, {username, id, title, category, url}) => {
            const profile = await Profiles.findOne({username})
            const lecture = await Lectures.findOne({shortid: id})

            if (profile && lecture) {

                let shortid = get_id()

                lecture.sources = [...lecture.sources, {
                    shortid,
                    name: profile.username,
                    title,
                    category,
                    url
                }]

                lecture.sources = slicer(lecture.sources, 40)

                await Lectures.updateOne({shortid: id}, {$set: lecture})

                return 'Success'
            }

            return 'Error'
        },
        createPractice: async (_, {username, id, title, category, university, faculty, semester, invite_code, weekday, region, cords, role}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const practice = await Practices.findOne({account_id: id, title, category, university, cords})

            if (profile && !practice) {
                if (profile.account_components.filter(el => el.path === 'practice').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'practice'
                    }]

                    const newPractice = new Practices({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        university,
                        faculty,
                        semester,
                        invite_code,
                        weekday,
                        region,
                        cords,
                        members: [{
                            account_id: profile.account_id,
                            username: profile.username,
                            role,
                            character: ''
                        }],
                        tasks: []
                    })
                    
                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newPractice.save()

                    return 'Success'
                }   
            }

            return 'Error'
        },
        getPractices: async (_, {username}) => {
            const practices = await Practices.find()

            return practices
        },
        getPractice: async (_, {username, shortid}) => {
            const practice = await Practices.findOne({shortid})

            return practice
        },
        managePracticeStatus: async (_, {username, id, option, role, invite_code, coll_id, character}) => {
            const profile = await Profiles.findOne({username})
            const practice = await Practices.findOne({shortid: id})
        
            if (profile && practice) {
                if (option === 'join' && practice.invite_code === invite_code) {

                    profile.account_components = [...profile.account_components, {
                        shortid: practice.shortid,
                        title: practice.title,
                        path: 'practice'
                    }]

                    practice.members = [...practice.members, {
                        account_id: profile.account_id,
                        username: profile.username,
                        role,
                        character: ''
                    }]

                } else if (option === 'exit') {

                    profile.account_components = profile.account_components.filter(el => el.shortid !== practice.shortid)

                    practice.members = practice.members.filter(el => el.account_id !== profile.account_id)

                } else {

                    practice.members.map(el => {
                        if (el.account_id === coll_id) {
                            if (option === 'update') {
                                el.role = role
                            } else if (option === 'estimate') {
                                el.character = character
                            }
                        }
                    })
                }

                await Profiles.updateOne({username}, {$set: profile})
                await Practices.updateOne({shortid: id}, {$set: practice})

                return 'Success'
            }

            return 'Error'
        },
        updatePracticeInfo: async (_, {username, id, invite_code, weekday}) => {
            const profile = await Profiles.findOne({username})
            const practice = await Practices.findOne({shortid: id})
        
            if (profile && practice) {

                practice.invite_code = invite_code
                practice.weekday = weekday
                
                await Practices.updateOne({shortid: id}, {$set: practice})

                return 'Success'
            }

            return 'Error'
        },
        managePracticeTask: async (_, {username, id, option, text, category, level, deadline, status, image, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const practice = await Practices.findOne({shortid: id})
        
            if (profile && practice) {
                if (option === 'create') {

                    let shortid = get_id()

                    practice.tasks = [...practice.tasks, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        level,
                        deadline,
                        status,
                        image,
                        likes: 0
                    }]

                    practice.tasks = slicer(practice.tasks, 40)

                } else if (option === 'delete') {

                    practice.tasks = practice.tasks.filter(el => el.shortid !== coll_id)

                } else {

                    practice.tasks.map(el => {
                        if (el.shortid === coll_id) {
                            if (option === 'like') {
                                el.likes += 1
                            } else if (option === 'update') {
                                el.status = status
                                el.image = image
                            }
                        }
                    })
                }

                await Practices.updateOne({shortid: id}, {$set: practice})

                return 'Success'
            }

            return 'Error'
        },
        createVacancy: async (_, {username, id, title, category, position, region, cords, experience, url}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const vacancy = await Vacancies.findOne({username, title, category, position, region, cords, experience, url})
       
            if (profile && !vacancy) {
                if (profile.account_components.filter(el => el.path === 'vacancy').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title,
                        path: 'vacancy'
                    }]

                    const newVacancy = new Vacancies({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        title,
                        category,
                        position,
                        region,
                        cords,
                        experience,
                        url,
                        questions: [],
                        photos: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newVacancy.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getVacancies: async (_, {username}) => {
            const vacancies = await Vacancies.find()

            return vacancies
        },
        getVacancy: async (_, {username, shortid}) => {
            const vacancy = await Vacancies.findOne({shortid})

            return vacancy
        },
        manageVacancyQuestion: async (_, {username, id, option, text, category, level, coll_id, answer}) => {
            const profile = await Profiles.findOne({username})
            const vacancy = await Vacancies.findOne({shortid: id})
        
            if (profile && vacancy) {
                if (option === 'create') {

                    let shortid = get_id()

                    vacancy.questions = [...vacancy.questions, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        level,
                        answer: '',
                        accepted: false
                    }]

                    vacancy.questions = slicer(vacancy.questions, 40)

                } else if (option === 'answer') {

                    vacancy.questions.map(el => {
                        if (el.shortid === coll_id) {
                            el.answer = answer
                            el.accepted = true
                        }
                    })

                } else {

                    vacancy.questions = vacancy.questions.filter(el => el.shortid !== coll_id)
                }

                await Vacancies.updateOne({shortid: id}, {$set: vacancy})

                return 'Success'
            }

            return 'Error'
        },
        manageVacancyPhoto: async (_, {username, id, option, title, format, image, dateUp, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const vacancy = await Vacancies.findOne({shortid: id})
        
            if (profile && vacancy) {
                if (option === 'create') {

                    let shortid = get_id()

                    vacancy.photos = [...vacancy.photos, {
                        shortid,
                        title,
                        format,
                        image,
                        dateUp,
                        likes: 0
                    }]

                    vacancy.photos = slicer(vacancy.photos, 40)

                } else if (option === 'like') {

                    vacancy.photos.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    vacancy.photos = vacancy.photos.filter(el => el.shortid !== coll_id)
                }
              
                await Vacancies.updateOne({shortid: id}, {$set: vacancy})

                return 'Success'
            }

            return 'Error'
        },
        createTutor: async (_, {username, id, fullname, category, institution, subjects, region, cords, url, grade, image}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const tutor = await Tutors.findOne({username, fullname, category, institution, cords})

            if (profile && !tutor) {
                if (profile.account_components.filter(el => el.path === 'tutor').find(el => el.title === fullname) === undefined) {

                    let shortid = get_id()

                    profile.account_components = [...profile.account_components, {
                        shortid,
                        title: fullname,
                        path: 'tutor'
                    }]

                    const newTutor = new Tutors({
                        shortid,
                        account_id: profile.account_id,
                        username: profile.username,
                        fullname,
                        category,
                        institution,
                        subjects,
                        region,
                        cords,
                        url,
                        grade,
                        image,
                        quotes: [],
                        reviews: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newTutor.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getTutors: async (_, {username}) => {
            const tutors = await Tutors.find()

            return tutors
        },
        getTutor: async (_, {username, shortid}) => {
            const tutor = await Tutors.findOne({shortid})

            return tutor
        },
        manageTutorQuote: async (_, {username, id, option, text, category, subject, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const tutor = await Tutors.findOne({shortid: id})
        
            if (profile && tutor) {
                if (option === 'create') {

                    let shortid = get_id()

                    tutor.quotes = [...tutor.quotes, {
                        shortid,
                        text,
                        category,
                        subject,
                        likes: 0
                    }]

                    tutor.quotes = slicer(tutor.quotes, 40)

                } else if (option === 'like') {

                    tutor.quotes.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    tutor.quotes = tutor.quotes.filter(el => el.shortid !== coll_id)
                }

                await Tutors.updateOne({shortid: id}, {$set: tutor})

                return 'Success'
            }

            return 'Error'
        },
        updateTutorInfo: async (_, {username, id, grade, image}) => {
            const profile = await Profiles.findOne({username})
            const tutor = await Tutors.findOne({shortid: id})
        
            if (profile && tutor) {

                tutor.grade = grade
                tutor.image = image

                await Tutors.updateOne({shortid: id}, {$set: tutor})

                return 'Success'
            }

            return 'Error'
        },
        makeTutorReview: async (_, {username, id, criterion, period, rating}) => {
            const profile = await Profiles.findOne({username})
            const tutor = await Tutors.findOne({shortid: id})
        
            if (profile && tutor) {

                let shortid = get_id()

                tutor.reviews = [...tutor.reviews, {
                    shortid,
                    name: profile.username,
                    criterion,
                    period,
                    rating
                }]

                tutor.reviews = slicer(tutor.reviews, 40)
                
                await Tutors.updateOne({shortid: id}, {$set: tutor})

                return 'Success'
            }

            return 'Error'
        }
       
       



    }
}

apollo_start(typeDefs, resolvers, app)

app.get('/towns', async (req, res) => {
    res.send(towns)
})

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))