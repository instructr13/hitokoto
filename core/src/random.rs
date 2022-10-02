use rand::Rng;

pub const DEFAULT_RANGE_MIN: f64 = 36.1;
pub const DEFAULT_RANGE_MAX: f64 = 36.7;

pub fn get_random_temperature(range_min: f64, range_max: f64) -> f64 {
    let mut rng = rand::thread_rng();

    rng.gen_range(range_min..range_max)
}
