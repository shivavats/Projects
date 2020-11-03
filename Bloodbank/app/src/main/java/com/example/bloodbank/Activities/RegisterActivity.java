package com.example.bloodbank.Activities;

        import androidx.annotation.Nullable;
        import androidx.appcompat.app.AppCompatActivity;

        import android.content.Intent;
        import android.os.Bundle;
        import android.util.Log;
        import android.view.View;
        import android.view.textclassifier.TextLinks;
        import android.widget.AdapterView;
        import android.widget.ArrayAdapter;
        import android.widget.Button;
        import android.widget.EditText;
        import android.widget.Spinner;
        import android.widget.Toast;

        import com.android.volley.AuthFailureError;
        import com.android.volley.Request;
        import com.android.volley.Response;
        import com.android.volley.VolleyError;
        import com.android.volley.toolbox.StringRequest;
        import com.example.bloodbank.R;
        import com.example.bloodbank.Utils.Endpoints;
        import com.example.bloodbank.Utils.VolleySingleton;

        import java.lang.reflect.Method;
        import java.util.ArrayList;
        import java.util.HashMap;
        import java.util.List;
        import java.util.Map;

        import javax.xml.transform.ErrorListener;
        import javax.xml.transform.TransformerException;

public class RegisterActivity extends AppCompatActivity {
    private EditText nameEt, mobileEt, passwordEt;
    private Button submitButton;
    Spinner cityEt, bloodGroupEt;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        nameEt = findViewById(R.id.name);
        cityEt = findViewById(R.id.spinner);



        List<String> list = new ArrayList<>();
        list.add("");
        list.add("North Delhi");
        list.add("South Delhi");
        list.add("East Delhi");
        list.add("West Delhi");
        list.add("Central Delhi");
        list.add("Faridabad");
        list.add("Ballabhgarh");
        list.add("Palwal");
        list.add("Gurugram");
        list.add("Noida");
        list.add("Gaziabad");
        list.add("Bahadurgarh");


        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item,list);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        cityEt.setAdapter(adapter);

        cityEt.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                parent.getItemAtPosition(position).toString();

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        mobileEt = findViewById(R.id.number);
        bloodGroupEt = findViewById(R.id.spinner2);

        List<String> list2 = new ArrayList<>();
        list2.add("");
        list2.add("A+");
        list2.add("A-");
        list2.add("B+");
        list2.add("B-");
        list2.add("O+");
        list2.add("O-");
        list2.add("AB+");
        list2.add("AB-");

        ArrayAdapter<String> adapter2 = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item,list2);
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        bloodGroupEt.setAdapter(adapter2);

        bloodGroupEt.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                parent.getItemAtPosition(position).toString();

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        passwordEt = findViewById(R.id.password);
        submitButton = findViewById(R.id.submit_button);
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String name, city, blood_group, password, mobile;
                name = nameEt.getText().toString();
                city = cityEt.getSelectedItem().toString();
                blood_group = bloodGroupEt.getSelectedItem().toString();
                password = passwordEt.getText().toString();
                mobile = mobileEt.getText().toString();
                if(isValid(name, city, blood_group, password, mobile)){
                    register(name, city, blood_group, password, mobile);
                    submitButton.setClickable(false);
                }
            }
        });
    }



    private void register(final String name, final String city, final String blood_group, final String password, final String mobile){
        StringRequest stringRequest = new StringRequest(Request.Method.POST, Endpoints.register_url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                if (response.equals("Success")) {
                    Toast.makeText(RegisterActivity.this, response, Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(RegisterActivity.this, MainActivity.class));
                    RegisterActivity.this.finish();
                } else {
                    Toast.makeText(RegisterActivity.this, response, Toast.LENGTH_SHORT).show();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(RegisterActivity.this, "Somthing went wrong", Toast.LENGTH_SHORT).show();
                Log.d("VOLLEY", error.getMessage());
            }
        }){
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
                params.put("name", name);
                params.put("city", city);
                params.put("blood_group", blood_group);
                params.put("password", password);
                params.put("number", mobile);
                return params;
            }
        };
        VolleySingleton.getInstance(this).addToRequestQueue(stringRequest);

    }

    private boolean isValid(String name, String city, String blood_group, String password, String mobile){

        if(name.isEmpty()){
            showMessage("Name is empty");
            return false;
        }else if(city.isEmpty()){
            showMessage("City is empty");
            return false;
        }else if (blood_group.isEmpty()){
            showMessage("Blood Group is empty");
            return false;
        }else if(mobile.length() != 10){
            showMessage("Mobile number should be of 10 digit");
            return false;
        }else if (password.isEmpty()){
            showMessage("Password is empty");
            return false;
        }
        return true;
    }

    private void showMessage(String msg){
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }
}
