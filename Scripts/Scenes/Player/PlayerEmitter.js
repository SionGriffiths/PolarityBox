/**
 * Created by pooey on 12/04/2014.
 */

var Particle = function(x, y, angle, speed, life, size) {

    /* the particle's position */

    this.pos = {

        x: x || 0,
        y: y || 0
    };

    /* set specified or default values */

    this.speed = speed || 5;

    this.life = life || 1;

    this.size = size || 2;

    this.lived = 0;

    /* the particle's velocity */

    var radians = angle * Math.PI / 180;

    this.vel = {

        x: Math.cos(radians) * speed,
        y: -Math.sin(radians) * speed
    };
};

var Emitter = function(x, y, colour, gameRef) {

    /* the emitter's position */

    this.pos = {

        x: x,
        y: y
    };

    /* set specified values */

    this.settings =  {

        'numParticles' : 15,
        'emission_rate': 50,
        'min_life': 3,
        'life_range': 2,
        'min_angle': 0,
        'angle_range': 360,
        'min_speed': 200,
        'speed_range': 200,
        'min_size': 3,
        'size_range': 2,
//            'colour': '#FFFFFF'
        'colour' : colour
    };


    /* How often the emitter needs to create a particle in milliseconds */


    this.emission_delay = 1000 / this.settings.emission_rate;

    /* we'll get to these later */

    this.last_update = 0;

    this.last_emission = 0;

    /* the emitter's particle objects */

    this.particles = [];

    for(var index  = 0; index < this.settings.numParticles; index++) {
        this.particles.push(
            new Particle(
                0,
                0,
                    this.settings.min_angle + Math.random() * this.settings.angle_range,
                    this.settings.min_speed + Math.random() * this.settings.speed_range,
                    this.settings.min_life + Math.random() * this.settings.life_range,
                    this.settings.min_size + Math.random() * this.settings.size_range
            )
        );
    }

    this.update = function() {

        /* set the last_update variable to now if it's the first update */

        if (!this.last_update || this.last_update == undefined) {

            this.last_update = Date.now();

            return;
        }

        /* get the current time */

        var time = Date.now();

        /* work out the milliseconds since the last update */

        var dt = time - this.last_update;

        /* add them to the milliseconds since the last particle emission */

        this.last_emission += dt;

        /* set last_update to now */

        this.last_update = time;

        /* check if we need to emit a new particle */

        if (this.last_emission > this.emission_delay) {

            /* find out how many particles we need to emit */

            var i = 10; // Math.floor(this.last_emission / this.emission_delay);

            /* subtract the appropriate amount of milliseconds from last_emission */

            this.last_emission -= i * this.emission_delay;

            /* while (i--) {

             *//* calculate the particle's properties based on the emitter's settings *//*

             this.particles.push(

             new Particle(
             0,
             0,
             this.settings.min_angle + Math.random() * this.settings.angle_range,
             this.settings.min_speed + Math.random() * this.settings.speed_range,
             this.settings.min_life + Math.random() * this.settings.life_range,
             this.settings.min_size + Math.random() * this.settings.size_range
             )
             );

             }*/
        }

        /* convert dt to seconds */
        dt /= 1000;

        /* loop through the existing particles */

        var i = this.particles.length;

        while (i--) {

            var particle = this.particles[i];

            /* skip if the particle is dead */

            if (particle.dead) {

                /* remove the particle from the array */
                this.particles.splice(i, 1);

                continue;
            }

            /* add the seconds passed to the particle's life */

            particle.lived += dt;

            /* check if the particle should be dead */

            if (particle.lived >= particle.life) {

                particle.dead = true;

                continue;
            }

            /* calculate the particle's new position based on the seconds passed */

            particle.pos.x += particle.vel.x * dt;
            particle.pos.y += particle.vel.y * dt;

            /* draw the particle */

            gameRef.Settings.Context.fillStyle = this.settings.colour;

            var x = this.pos.x + particle.pos.x;
            var y = this.pos.y + particle.pos.y;

//            Game.context.beginPath();
//            Game.context.arc(x, y, particle.size, 0, Math.PI * 2);
            gameRef.Settings.Context.fillRect(x,y,5,5);
//            Game.context.fill();
        }
    };
};




