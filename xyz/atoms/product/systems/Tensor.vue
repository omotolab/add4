<template lang="pug">
    div hello TensorFlow
        button(@click="getData") hello button
        ul
            li(v-for="car in cars") {{ car.name }}
</template>

<script>

import * as tf from "@tensorflow/tfjs"
import * as tfvis from "@tensorflow/tfjs-vis"
import dataToTensor from "@/assets/js/toTensor"
import trainModel from "@/assets/js/trainModel"
import testModel from "@/assets/js/testModel"

console.log(testModel)

export default {
    layout: 'globe',
    
    data(){
        return {
            cars: null,
            model: null,
        }
    },
    created() {
        console.log(Date.now(), 'created')

    },
    mounted() {
        console.log(Date.now(), 'mounted')
        this.plotData()
        this.model = this.createModel();  
        tfvis.show.modelSummary({name: 'Model Summary'}, this.model);
    },

    methods: {
        createModel() {
            // Create a sequential model
            const model = tf.sequential(); 
            
            // Add a single hidden layer
            model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
            
            // Ading more hidden layers in between the first hidden layer we added and the final output layer.
            model.add(tf.layers.dense({units: 100, activation: 'sigmoid'}));

            // Add an output layer
            model.add(tf.layers.dense({units: 1, useBias: true}));

            return model;
        },
        async getData() {
            const carsDataReq = await fetch('https://storage.googleapis.com/tfjs-tutorials/carsData.json');  
            const carsData = await carsDataReq.json();  
            const cleaned = carsData.map(car => ({
                name: car.Name,
                cylinders: car.Cylinders,
                mpg: car.Miles_per_Gallon,
                horsepower: car.Horsepower,
                weight: car.Weight_in_lbs,
            }))
            .filter(car => (car.mpg != null && car.horsepower != null));
            
            this.cars = cleaned
            return cleaned;
        },
        async plotData() {
            // Load and plot the original input data that we are going to train on.
            const data = await this.getData();
            const values = data.map(d => ({
                x: d.horsepower,
                y: d.mpg,
            }));

            tfvis.render.scatterplot(
                {name: 'Horsepower v weight'},
                {values}, 
                {
                xLabel: 'Horsepower',
                yLabel: 'mpg',
                height: 300
                }
            );

            // More code will be added below
            // Convert the data to a form we can use for training.
            const tensorData = dataToTensor(data);
            const {inputs, labels} = tensorData;
                
            // Train the model  
            await trainModel(this.model, inputs, labels);
            console.log(Date.now(), 'Done Training');
            
            // Make some predictions using the model and compare them to the
            // original data
            testModel(this.model, data, tensorData);
        }
    }
}
</script>
