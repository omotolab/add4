<template lang="pug">
div 
    div logic.to / {{ $route.params.logic }}
    p {{ $route.params.to }}
    p {{ $route.params.act }}
    // ul
        li 
            n-link 
</template>
<script>
const transform = function( in_array ) {
 var len = in_array.length;
 var output = new Array();
 
 for( var k=0; k < len; k++ ) {
   var real = 0;
   var imag = 0;
   for( var n=0; n < len; n++ ) {
     real += in_array[n]*Math.cos(-2*Math.PI*k*n/len);
     imag += in_array[n]*Math.sin(-2*Math.PI*k*n/len);
   }
   output.push( [ real, imag ] )
 }
 return output;
}

const signal = function (data) {
    let x
    for(x=0;x<1000;x++) {
        return data[x]=2*Math.cos(Math.PI*2*x)+Math.cos(Math.PI*4*x);
    }
}

export default {
    data() {
        return {
            signal: [],
            model: []
        }
    },
    mounted() {
        // console.log(this.$router)
        this.signal = signal(this.model)
        this.model = transform(this.signal)
        
    },
}
</script>