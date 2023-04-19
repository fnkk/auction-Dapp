import { Carousel } from 'antd';
import Particles from 'particlesjs'
import { useEffect } from 'react';
function Homepage() {
    useEffect(() => {
        Particles.init({
            selector: '.bk',
            color: ['#9EFF76'],
            connectParticles: true,
            speed: 0.2,
            sizeVariations: 3,
        });
    }, [])
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        windth: '160px',
        textAlign: 'center',
        background: '#364d79'
    };
    return (
        <div className="homepage">
            <div className='top_box'>
                <canvas className='bk'>
                </canvas>
            </div>
            <div className='content'>
                {/* <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel> */}
            </div>

        </div>
    )
}
export default Homepage;