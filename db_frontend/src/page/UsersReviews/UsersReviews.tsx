import { Avatar, Divider, Rating } from '@mui/material';
import './UsersReviews.css';

const reviews = [
  {
    id: 1,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 2,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 3,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 4,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 5,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 6,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 7,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 8,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 9,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 10,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
  {
    id: 11,
    user: {
      name: 'Gena',
      avatar: '',
    },
    rating: 4,
    text: 'Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва Текст отзыва ',
    date: new Date(),
  },
];

function UsersReviews() {
  return (
    <div className="UsersReviews">
      {reviews.map((review, index) => (
        <div className="UsersReviews__review" key={review.id}>
          <div className="UsersReviews__review-header">
            <div className="review-header__user-info">
              <div className="user-info__avatar">
                <Avatar src={review.user.avatar} />
              </div>
              <div className="user-info__name">
                {review.user.name}
              </div>
            </div>
            <div className="review-header__review-info">
              <div className="review-info__date">
                {`${review.date.getDay()}.${review.date.getMonth()}.${review.date.getFullYear()}`}
              </div>
              <div className="review-info__rating">
                <Rating value={review.rating} readOnly />
              </div>
            </div>
          </div>
          <div className="UsersReviews__body">
            {review.text}
          </div>
          {index !== reviews.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}

export default UsersReviews;
