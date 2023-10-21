

    
    
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.1;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'white';

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();

                ctx.fill();
            }
        }

        function connectPoints(points) {
            let opacity;
            for (let i = 0; i < points.length; i++) {
                for (let j = i; j < points.length; j++) {
                    let distance = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
                    opacity = 1 - distance / 100;
                    if (opacity > 0) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        }
        const screenSize = Math.sqrt(canvas.width * canvas.height);
        const numPoints = Math.floor(screenSize / 4); // 鏍规嵁灞忓箷澶у皬鑷姩璁＄畻鐐圭殑鏁伴噺


        const points = [];
        

        for (let i = 0; i < numPoints; i++) {
            points.push(new Point(Math.random() * canvas.width, Math.random() * canvas.height));
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < numPoints; i++) {
                points[i].update();
                points[i].draw();
            }

            connectPoints(points);

            requestAnimationFrame(animate);
        }
        window.onload = function() {
            var div = document.getElementById('myDiv');
            div.style.opacity = '1';
            }

        animate();
