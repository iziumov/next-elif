'use client';

import { useState } from 'react';
import useRegister from '@/store/register';
import { EDidYouHear } from '@/store/register';

const RegisterModal = () => {
  const {
    id,
    name,
    email,
    birthday,
    whereDidYouHear,
    isOpen,
    setClose,
    setId,
    setName,
    setEmail,
    setBirthday,
    setWhereDidYouHear,
    clearModal,
  } = useRegister();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setId('');
    setClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minDate = new Date('1945-02-10');
    const maxDate = new Date('2024-05-21');
    const birthDate = new Date(birthday);

    if (name.length < 5 || name.length > 20) {
      setError('Name must be between 5 and 20 characters.');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!birthday || birthDate < minDate || birthDate > maxDate) {
      setError('Please enter a birthday between 10-02-1945 and 21-05-2024.');
      return;
    }

    if (!whereDidYouHear) {
      setError('Please select where you heard about the event.');
      return;
    }

    const participantData = {
      dateofbirth: birthDate,
      email: email,
      eventId: id,
      fullName: name,
      wheredidyourhear: whereDidYouHear,
    };

    try {
      setLoading(true);
      const response = await fetch('/api/participant/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(participantData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'An error occurred');
        return;
      }

      clearModal();
    } catch (error) {
      console.log(error);
      setError('An error occurred while registering the participant');
    } finally {
      setLoading(false);
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed inset-0 outline-none focus:outline-none bg-neutral-800 bg-opacity-70 z-50">
      <div className="relative w-full h-full lg:w-2/6 my-6 mx-auto lg:max-w-3xl lg:h-auto">
        <form
          className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative p-3 flex flex-col gap-3 w-full bg-black outline-none focus:outline-none"
          onSubmit={handleSubmit}>
          <div className="flex justify-between align-center py-1 border-b-[1px] border-white">
            <h1>Event registration</h1>
            <button className="text-xl" onClick={handleClose}>
              x
            </button>
          </div>
          <label htmlFor="fullname" className="flex gap-5">
            Fullname:
          </label>
          <input
            type="text"
            className="self-start text-black px-1 py-1"
            name="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="email"
            className="self-start text-black px-1 py-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="date" className="">
            Date:
          </label>
          <input
            type="date"
            className="self-start text-black px-1 py-1"
            name="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <div className="">
            <h4>Where did you hear about this event?</h4>
            <div className="flex justify-between">
              <label htmlFor={EDidYouHear.socialmedia} className="flex gap-2">
                <input
                  type="radio"
                  id={EDidYouHear.socialmedia}
                  name="wheredidyourhear"
                  checked={whereDidYouHear === EDidYouHear.socialmedia}
                  onChange={() => setWhereDidYouHear(EDidYouHear.socialmedia)}
                />
                Social Media
              </label>

              <label htmlFor={EDidYouHear.friends} className="flex gap-2">
                <input
                  type="radio"
                  name="wheredidyourhear"
                  id={EDidYouHear.friends}
                  checked={whereDidYouHear === EDidYouHear.friends}
                  onChange={() => setWhereDidYouHear(EDidYouHear.friends)}
                />
                Friends
              </label>

              <label htmlFor={EDidYouHear.foundmyself} className="flex gap-2">
                <input
                  type="radio"
                  name="wheredidyourhear"
                  id={EDidYouHear.foundmyself}
                  checked={whereDidYouHear === EDidYouHear.foundmyself}
                  onChange={() => setWhereDidYouHear(EDidYouHear.foundmyself)}
                />
                Found Myself
              </label>
            </div>
            <div className="my-2 text-red-600">{error}</div>
          </div>
          <button
            className="mt-3 px-2 py-1 bg-white text-black self-start hover:opacity-50"
            type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
