from flask import Flask, jsonify
from pyspark.sql import SparkSession
import delta_sharing
import os
import sys
os.environ['PYSPARK_PYTHON'] = sys.executable
os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable
import pyspark
print(pyspark.__version__)

app = Flask(__name__)

# Initialize Spark Session
spark = SparkSession \
    .builder \
    .appName("Python Spark SQL API") \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
    .config("spark.jars.packages", "io.delta:delta-sharing-spark_2.12:3.3.0") \
    .getOrCreate()

# Delta Sharing Client
config = "config.share"
client = delta_sharing.SharingClient(config)

@app.route('/data', methods=['GET'])
def get_data():
    df = spark.read.format("deltaSharing").load("config.share#start_hack_2025.start_hack_2025.ev3_dataprofile").limit(3)
    return jsonify(df.toPandas().to_dict(orient="records"))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
