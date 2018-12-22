
const expect = require('expect');

const request = require('supertest');

const app = require('./../server');

const Party = require('../models/employee');

describe('GET /api/employee', () => {

    it('should get all employee', (done) => {

        request(app).
            get('/api/employee').
            expect(200).
            expect((res) => {
                expect(res.body.employee.length).toBe(1);
            })
            .end(done);

    });
      
});
