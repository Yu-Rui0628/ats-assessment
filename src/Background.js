import React, { useEffect } from 'react';
import './Background.css';

function Background() {
  useEffect(() => {
    const canvas = document.getElementById('ps5Canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createShape(type, size) {
      return {
        type: type,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5,
        size: size,
        angle: 0,
        vAngle: Math.random() * 0.02 - 0.01
      };
    }

    let shapes = [];
    const shapeTypes = ['triangle', 'circle', 'square', 'x'];
    const size = 60;
    const count = 6;

    for (let i = 0; i < count; i++) {
      shapeTypes.forEach(type => {
        shapes.push(createShape(type, size));
      });
    }

    function drawShape(shape) {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.angle);
      ctx.strokeStyle = 'black'; 

      ctx.lineWidth = 1;
      ctx.beginPath();

      if (shape.type === 'triangle') {
        ctx.moveTo(0, -shape.size / 2);
        ctx.lineTo(shape.size / 2, shape.size / 2);
        ctx.lineTo(-shape.size / 2, shape.size / 2);
        ctx.closePath();
      } else if (shape.type === 'circle') {
        ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
      } else if (shape.type === 'square') {
        ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
      } else if (shape.type === 'x') {
        ctx.moveTo(-shape.size / 2, -shape.size / 2);
        ctx.lineTo(shape.size / 2, shape.size / 2);
        ctx.moveTo(shape.size / 2, -shape.size / 2);
        ctx.lineTo(-shape.size / 2, shape.size / 2);
      }

      ctx.stroke();
      ctx.restore();
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(shape => {
        drawShape(shape);
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.angle += shape.vAngle;

        if (shape.x < 0 || shape.x > canvas.width) shape.vx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.vy *= -1;
      });

      requestAnimationFrame(update);
    }

    update();

    return () => {
      cancelAnimationFrame(update);
    };
  }, []);

  return (
    <div className="content-container">
      <canvas id="ps5Canvas"></canvas>
    </div>
  );
}

export default Background;
