const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const createdTrack = await Track.create(req.body)
        res.status(201).json(createdTrack)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const playlist = await Track.find()
        res.status(200).json(playlist)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/:trackId', async (req, res) => {
    try {
        const selectedSong = await Track.findById(req.params.trackId)
        if (!selectedSong) {
            res.status(404)
            throw new Error('Track not found')
        }
        res.status(200).json(selectedSong)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        }
        else {
            res.status(500).json({ error: error.message})
        }
    }
}) 

router.delete('/:trackId', async (req, res) => {
    try {
        const removedSong = await Track.findByIdAndDelete(req.params.trackId)
        if (!removedSong) {
            res.status(404)
            throw new Error('Track not found')
        }
        res.status(200).json(removedSong)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        }
        else {
            res.status(500).json({ error: error.message})
        }
    }
})

router.put('/:trackId', async (req, res) => {
    try {
        const changedSong = await Track.findByIdAndUpdate(req.params.trackId, req.body, { new: true })
        if (!changedSong) {
            res.status(404)
            throw new Error('Track not found')
        }
        res.status(200).json(changedSong)
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        }
        else {
            res.status(500).json({ error: error.message})
        }
    }
})

module.exports = router