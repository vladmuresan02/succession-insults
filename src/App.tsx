import { useState, useEffect, useRef } from 'react'
import data from './data/db'
import logo from '../src/assets/waystar-royco-logo.png'
import { Transition } from 'react-transition-group';


function App() {


  const [activeInsult, setActiveInsult] =
    useState<Record<string, string>>({})

  let [transitionControl, setTransitionControl] = useState(false);

  const nodeRef = useRef(null)

  useEffect(() => {
    transitionControl = true;
    setActiveInsult(data[0]);
  }, [data])

  useEffect(() => {
    setTransitionControl(false)
  }, [activeInsult])
  const transitionDuration = 300

  const newInsult = () => {
    setTransitionControl(true);
    setTimeout(() => {
      const min = Math.ceil(0);
      const max = Math.floor(Object.keys(data).length);
      let newIndex = Math.floor(Math.random() * (max - min) + min).toString();
      setActiveInsult(data[newIndex])
    }, transitionDuration)



  }
  const transitionStyles: Record<string, Record<string, string | number>> = {
    entering: { opacity: 0.2 },
    entered: { opacity: 0 },
    exiting: { opacity: 0.7 },
    exited: { opacity: 1 },
  };

  return (
    <>
      <main className="app-bg bg-[url('assets/bg.webp')] h-screen w-full bg-no-repeat flex items-center justify-center flex-col sm:pb-24 sm:px-32 pb-16 px-8" >
        <img src={logo} alt="" className='mb-8 mt-3 ' width={150} />
        {activeInsult &&
          <Transition nodeRef={nodeRef} in={transitionControl} timeout={transitionDuration
          }>
            {state => (
              <section className="  mt-auto mb-auto bg-cover  text-gray-100 w-full sm:w-4/6 transition-all  ease-in-out " style={{ ...transitionStyles[state] }}>
                <h3 className='tracking-widest sm:text-3xl/10  text-xl/10 '>{activeInsult.insult}</h3>
                <div className="insult-after flex items-center flex-row  mt-6 w-full">
                  <div className="line  bg-white grow mr-2  opacity-20 h-0.5"></div>
                  <p className='text-uppercase tracking-big uppercase text-sm opacity-50 sm:text-md text-gray-300 font-thin'>{activeInsult.character}</p>
                </div>
              </section>
            )}
          </Transition>
        }
        <button type="button" className='
         px-8 py-3 color-white  text-gray-100 bg-gray-950  tracking-widest hover:bg-gray-100 hover:text-gray-950 hover:tracking-big transition-all ease-in-out duration-500  mb-0' onClick={newInsult}>
          NEW INSULT
        </button>

        <div>

        </div>
      </main>
    </>
  )
}

export default App
