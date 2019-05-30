import PhotoService from '../services/PhotoService';
import express from 'express'


let _service = new PhotoService()
let _repo = _service.repository

export default class PhotoController {
    constructor() {
        this.router = express.Router()
            .get('', this.getAllPhotos)
            .get('/:id', this.getPhotoById)
            .put('/:id', this.editPhoto)
            .put('/:id/comments', this.commentsRoute)
            .post('', this.createPhoto)
            .delete('/:id', this.deletePhoto)
            .use('*', this.defaultRoute)
    }
    async getAllPhotos(req, res, next) {
        try {
            let photos = await _repo.find({})
            return res.send(photos)
        } catch (error) { next(error) }
    }
    async getPhotoById(req, res, next) {
        try {
            let photo = await _repo.findById(req.params.id)
            return res.send(photo)
        } catch (error) { next(error) }
    }
    async editPhoto(req, res, next) {

    }
    async createPhoto(req, res, next) {
        try {
            let photo = await _repo.create(req.body)
            return res.status(201).send(photo)
        } catch (error) { next(error) }
    }
    async deletePhoto(req, res, next) {

    }

    async commentsRoute(req, res, next) {
        try {
            let photo = await _service.commentsRoute(req.params.id, req.body) 
            return res.status(200).send(photo)
        } catch (error) {
            next(error)
        }
    }

    defaultRoute(req, res, next) {

    }
}