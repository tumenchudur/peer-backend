// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable no-unused-expressions */
// import chai, { assert } from 'chai'
// import '@root/loaders/env'
// import app from '@root/bootstrap'
// import chaiHttp from 'chai-http'
// // chai.use(require('chai-json-schema'))

// chai.use(chaiHttp)

// const TEST_MERCHANT_API_KEY = 'test-api-key'
// const TEST_MERCHANT_ID = '60126ec624ecc843e9ee8488'

// describe('GET /thirdparty/users/:username', () => {
//     it('should work', () => {
//         app.then((server) => {
//             // const user = await User.findOne({})
//             // console.log(user)

//             chai.request(server)
//                 .get(`/v1/thirdparty/users/5004`)
//                 .set('Authorization', TEST_MERCHANT_API_KEY)
//                 .end((err, res) => {
//                     console.log(res.status)
//                     console.log(res.body)
//                     assert.equal(res.status, 200)
//                 })
//         })
//     })
// })

// describe('POST /admin/users', () => {
//     it('should work', async () => {
//         // const user = await User.findOne({})
//         // console.log(user)
//         await app.then(() => {
//             console.log(`/v1/admin/merchants/${TEST_MERCHANT_ID}/users`)

//             chai.request('http://localhost:3000')
//                 .post(`/v1/admin/merchants/${TEST_MERCHANT_ID}/users`)
//                 .send({
//                     username: 'test',
//                     password: 'mongolia@@@@-1231414',
//                     groupName: 'Steppe-Administrators'
//                 })
//                 .end((err, rrr) => {
//                     console.error('err: ', err)
//                     console.log(rrr)

//                     console.log(rrr.status)
//                 })

//             // console.log('response: ', response)

//             // console.log(response)
//             // console.log(response.body)

//             // assert.equal(response.status, 200)
//         })
//     })
// })

// // describe('Route GET consumer list', () => {
// //     it('should return 200 OK', async () => {
// //         app.then((server) => {
// //             request(server)
// //                 .get('/v1/thirdparty/users/5004')
// //                 .set('Accept', 'application/json')
// //                 .set('Authorization', 'test-api-key')
// //                 .expect('Content-Type', /json/)
// //                 .expect(200)

// //             return Promise.resolve()
// //         })
// //     })
// // })

// // describe('Route UPDATE consumer', () => {
// //     it('should return 200 OK', async () => {
// //         app.then(async (server) => {
// //             try {
// //                 const res = await request(server)
// //                     .put(`/${config.api.prefix}/consumer/95008950`)
// //                     .send({
// //                         mobile: '95008951',
// //                         balance_status: '0',
// //                         token: '123'
// //                     })
// //                     .expect(500)

// //                 expect(res.body.error).to.be.string
// //                 return Promise.resolve()
// //             } catch (err) {
// //                 return Promise.reject(err)
// //             }
// //         })
// //     })
// // })

// // describe('Thirdparty create user', () => {
// //     it('should return 200 OK', async () => {
// //         app.then((server) => {
// //             request(server)
// //                 .post('/v1/thirdparty/users')
// //                 .send({ username: 'eegoakba' })
// //                 .set('Accept', 'application/json')
// //                 .set('Authorization', 'test-api-key')
// //                 .expect('Content-Type', /json/)
// //                 .expect(200)

// //             return Promise.resolve()
// //         })
// //     })
// // })

// // describe('POST /users', () => {
// //     it('responds with json', async () => {
// //         app.then(async (server) => {
// //             chai.request(app).get('/')
// //         })
// //     })
// // })

// /*
// describe('Route GET specific consumer by mobile, registration_number', () => {
//     it('should return 200 OK', async () => {
//         try {
//             const resByPhoneNumber = await request(app)
//                 .get(`/${config.api.prefix}/consumer/95008950`)
//                 .expect(200)
//             expect(resByPhoneNumber.body.status).to.be.string
//             expect(resByPhoneNumber.body.status).to.equal('success')

//             expect(resByPhoneNumber.body.statusCode).to.be.an('number')
//             expect(resByPhoneNumber.body.statusCode).to.equal(0)

//             expect(resByPhoneNumber.body.errors).to.be.null

//             expect(resByPhoneNumber.body.data).to.be.jsonSchema

//             const resByRegistrationNumber = await request(app)
//                 .get(`/${config.api.prefix}/consumer/%D0%A3%D0%A897062034`)
//                 .expect(200)
//             expect(resByRegistrationNumber.body.status).to.be.string
//             expect(resByRegistrationNumber.body.status).to.equal('success')

//             expect(resByRegistrationNumber.body.statusCode).to.be.an('number')
//             expect(resByRegistrationNumber.body.statusCode).to.equal(0)

//             expect(resByRegistrationNumber.body.errors).to.be.null

//             expect(resByRegistrationNumber.body.data).to.be.jsonSchema
//             return Promise.resolve()
//         } catch (err) {
//             return Promise.reject(err)
//         }
//     })
// })

// describe('Route CREATE consumer', () => {
//     it('should timeout after 5000ms', async () => {
//         try {
//             const res = await request(app)
//                 .post(`/${config.api.prefix}/consumer`)
//                 .send({
//                     mobile: '95008950',
//                     // eslint-disable-next-line @typescript-eslint/camelcase
//                     balance_status: '1',
//                     token: 'ge'
//                 })
//                 .expect(500)

//             expect(res.body.error).to.be.string
//             return Promise.resolve()
//         } catch (err) {
//             return Promise.reject(err)
//         }
//     }).timeout(6000)
// })

// describe('Route UPDATE consumer', () => {
//     it('should return 200 OK', async () => {
//         try {
//             const res = await request(app)
//                 .put(`/${config.api.prefix}/consumer/95008950`)
//                 .send({
//                     mobile: '95008951',
//                     // eslint-disable-next-line @typescript-eslint/camelcase
//                     balance_status: '0',
//                     token: '123'
//                 })
//                 .expect(500)

//             expect(res.body.error).to.be.string
//             return Promise.resolve()
//         } catch (err) {
//             return Promise.reject(err)
//         }
//     })
// })

// describe('Route DELETE consumer', () => {
//     it('should return 401 FORBIDDEN', async () => {
//         try {
//             const res = await request(app)
//                 .del(`/${config.api.prefix}/consumer/95008950`)
//                 .expect(401)
//             expect(res.body.status).to.be.string
//             expect(res.body.status).to.equal('error')

//             expect(res.body.statusCode).to.be.an('number')
//             expect(res.body.statusCode).to.equal(401)

//             expect(res.body.errors).to.be.jsonSchema

//             expect(res.body.data).to.be.null
//             return Promise.resolve()
//         } catch (err) {
//             return Promise.reject(err)
//         }
//     })
// })
// // */

// // describe('Test for travis', () => {
// //     it('should run server', async (): Promise<void> => {
// //         app.then((server) => {
// //             request(server)
// //                 .get(`/status`)
// //                 .expect(200)
// //                 .then(() => Promise.resolve())
// //         })
// //     })
// // })
