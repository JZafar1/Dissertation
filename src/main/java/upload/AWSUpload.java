package upload;

/*
 * com.amazonaws libraries imported from
 *https://jar-download.com/artifacts/com.amazonaws/aws-java-sdk-s3
 * See POM.xml for dependency info
 */

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import update.CreateDictionary;

import java.io.File;


/**
 * Class used to upload files to AWS S3 Bucket for the web GUI
 */
public class AWSUpload {

    public AWSUpload() {
        final AWSCredentials credentials = new BasicAWSCredentials(
                "AKIASK7K4P3QKM2X4YKU",
                "cqhmZKie8i1ZFWA1Ckjr4KqvalicneuZGyG10qkP"
        );
        //Create an instance of the S3 used in this project
        final AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.EU_WEST_2)
                .build();
        //Location of the web config file
        String filePath = System.getProperty("user.dir") + "/src/main/java/upload/webDisplay.JSON";
        try {
            //Create new S3 object with the local file contents
            s3.putObject(new PutObjectRequest(
                    "dissertation-bucket", "webDisplay.json", new File(filePath))
                    .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            //A dictionary is required as part of the web UI, if one does not exist in S3 bucket, then create one
            if(!(s3.doesObjectExist("dissertation-bucket", "Dictionary.json"))) {
                //CreateDictionary() created a local copy of the dictionary to be pushed to S3
                new CreateDictionary();
                String path = System.getProperty("user.dir") + "/src/main/java/update/Dictionary.json";
                s3.putObject(new PutObjectRequest(
                        "dissertation-bucket", "Dictionary.json", new File(path))
                        .withCannedAcl(CannedAccessControlList.PublicRead)
                );
            }
        } catch (AmazonServiceException e) {
            System.out.println("Error, could not generate GUI.");
            System.out.println(e.getMessage());
        }
    }
}


