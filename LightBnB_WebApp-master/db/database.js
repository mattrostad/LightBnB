const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  console.log("email", email);
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      console.log("result", result);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const userId = Object.keys(users).length + 1;
  user.id = userId;

  return pool
    .query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [user.name, user.email, user.password]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
    .query(
      `SELECT properties.* 
  FROM properties
  JOIN reservations
  ON reservations.property_id = properties.id 
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date
  LIMIT $2`,
      [guest_id, limit]
    )
    .then((result) => {
      return result.rows;
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  let filterCount = 0;

  if (Object.values(options).join("")) {
    queryString += ` WHERE `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `owner_id  = $${queryParams.length} AND `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryParams.push(options.maximum_price_per_night);
    queryString += `cost_per_night BETWEEN $${queryParams.length - 1} AND $${
      queryParams.length
    } AND `;
  } else if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `cost_per_night >= $${queryParams.length} AND `;
  } else if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `cost_per_night <= $${queryParams.length} AND `;
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `avg(property_reviews.rating) >= $${queryParams.length} AND `;
  }

  if (queryString.endsWith(" AND ")) {
    queryString = queryString.slice(0, -5);
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

const options = {
  owner_id: 123, // Optional: Filter by owner_id
  minimum_price_per_night: 50, // Optional: Filter by minimum price per night
  maximum_price_per_night: 150, // Optional: Filter by maximum price per night
  minimum_rating: 4, // Optional: Filter by minimum rating
};

getAllProperties(options, 10).then((rows) => {
  return result.rows;
});

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function (property) {
  return new Promise((resolve, reject) => {
    // Define the SQL query to insert the property into the table
    const query = `
      INSERT INTO properties (
        owner_id, title, description, thumbnail_photo_url, cover_photo_url,
        cost_per_night, street, city, province, post_code, country,
        parking_spaces, number_of_bathrooms, number_of_bedrooms
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      )
      RETURNING *;
    `;

    // Extract the property values into an array
    const values = [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night,
      property.street,
      property.city,
      property.province,
      property.post_code,
      property.country,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms
    ];

    // Execute the query using the connection pool
    pool.query(query, values)
      .then(result => {
        // Resolve the promise with the saved property
        resolve(result.rows[0]);
      })
      .catch(error => {
        // Reject the promise with the error
        reject(error);
      });
  });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
