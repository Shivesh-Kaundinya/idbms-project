import API from '../services/axios'

const getCar = async (registrationNo) => {
    const response = await API.get(`/vehicle/${registrationNo}`)
    if (response.status === 200 && response.data) {
        return response.data
    }
    return null
}

const getAllCars = async () => {
    const response = await API.get('/vehicle/all')
    if (response.status === 200 && response.data) {
        // console.log(response)
        const cars = response.data
        const [hatchback, sedan, suv] = [
            cars.filter(car => car.type === 1),
            cars.filter(car => car.type === 2),
            cars.filter(car => car.type === 3),
        ]
        return { hatchback, sedan, suv }
    }
    return null
}

const getCarsData = async (registrationNos) => {
    try {
        registrationNos = [...new Set(registrationNos)]
        const promises = registrationNos.map(rn => getCar(rn))
        const result = await Promise.all(promises)
        return result
    }
    catch (err) {
        console.error(err)
        return null
    }
}

const addCar = async (carData) => {
    const response = await API.post('/vehicle/add', carData)
    if (response.status === 200 && response.data) {
        return response.data
    }
    return null
}

const deleteCar = async (registrationNo) => {
    const response = await API.delete(`/vehicle/${registrationNo}/delete`)
    return response.status === 200 && response.data === true
}

const getRentals = async (email) => {
    const response = await API.get(`/user/${email}/rentals`)
    if (response.status === 200 && response.data) {
        return response.data
    }
    return null
}

const addRental = async (data) => {
    const response = await API.post('/rental/add', data)
    return response.status === 200 && response.data
}

const getRentalRates = async () => {
    const response = await API.get('/vehicletype/all')
    if (response.status === 200 && response.data) {
        return response.data
    }
}

export { getRentals, getAllCars, addCar, deleteCar, addRental, getCarsData, getRentalRates }