'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface ProfileData {
  nickname: string;
  age: number;
  location: string;
  occupation: string;
  relationshipStatus: string;
  hasChildren: string;
  sleepPattern: string;
  weekendActivity: string;
  exerciseHabit: string;
  drinkingHabit: string;
  smokingHabit: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: '',
    age: 0,
    location: '',
    occupation: '',
    relationshipStatus: '',
    hasChildren: '',
    sleepPattern: '',
    weekendActivity: '',
    exerciseHabit: '',
    drinkingHabit: '',
    smokingHabit: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    
    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">프로필 작성</h2>
          
          {showSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              저장 완료!
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 프로필 사진 업로드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                프로필 사진
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>

            {/* 기본 정보 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">기본 정보</h3>
              
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                  닉네임
                </label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.nickname}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  나이
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.age}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  거주지역
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                  직업/직군
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.occupation}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="relationshipStatus" className="block text-sm font-medium text-gray-700">
                  연애 상태
                </label>
                <select
                  id="relationshipStatus"
                  name="relationshipStatus"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.relationshipStatus}
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="single">싱글</option>
                  <option value="dating">연애중</option>
                  <option value="married">기혼</option>
                  <option value="divorced">이혼</option>
                </select>
              </div>

              <div>
                <label htmlFor="hasChildren" className="block text-sm font-medium text-gray-700">
                  자녀 유무
                </label>
                <select
                  id="hasChildren"
                  name="hasChildren"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.hasChildren}
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="yes">유</option>
                  <option value="no">무</option>
                </select>
              </div>
            </div>

            {/* 라이프스타일 */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">라이프스타일</h3>

              <div>
                <label htmlFor="sleepPattern" className="block text-sm font-medium text-gray-700">
                  수면 패턴
                </label>
                <select
                  id="sleepPattern"
                  name="sleepPattern"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.sleepPattern}
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="morning">아침형</option>
                  <option value="night">저녁형</option>
                  <option value="irregular">불규칙</option>
                </select>
              </div>

              <div>
                <label htmlFor="weekendActivity" className="block text-sm font-medium text-gray-700">
                  주말 활동
                </label>
                <select
                  id="weekendActivity"
                  name="weekendActivity"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.weekendActivity}
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="home">집콕</option>
                  <option value="outdoor">야외활동</option>
                  <option value="friends">친구 모임</option>
                  <option value="culture">문화생활</option>
                </select>
              </div>

              <div>
                <label htmlFor="exerciseHabit" className="block text-sm font-medium text-gray-700">
                  운동 습관
                </label>
                <select
                  id="exerciseHabit"
                  name="exerciseHabit"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.exerciseHabit}
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="frequent">자주 함</option>
                  <option value="sometimes">가끔 함</option>
                  <option value="never">안 함</option>
                </select>
              </div>

              <div>
                <label htmlFor="drinkingHabit" className="block text-sm font-medium text-gray-700">
                  음주 여부
                </label>
                <select
                  id="drinkingHabit"
                  name="drinkingHabit"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.drinkingHabit}
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="yes">마심</option>
                  <option value="sometimes">가끔</option>
                  <option value="no">안 마심</option>
                </select>
              </div>

              <div>
                <label htmlFor="smokingHabit" className="block text-sm font-medium text-gray-700">
                  흡연 여부
                </label>
                <select
                  id="smokingHabit"
                  name="smokingHabit"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={profileData.smokingHabit}
                  onChange={handleInputChange}
                >
                  <option value="">선택하세요</option>
                  <option value="yes">함</option>
                  <option value="no">안 함</option>
                  <option value="past">과거엔 함</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 