package com.example.bloodbank.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
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
import com.example.bloodbank.DataModels.RelatedData;
import com.example.bloodbank.R;
import com.example.bloodbank.Utils.Endpoints;
import com.example.bloodbank.Utils.VolleySingleton;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    Spinner cityEt, blood_groupEt;
    Button submit_button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
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
        blood_groupEt = findViewById(R.id.spinner2);

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

        blood_groupEt.setAdapter(adapter2);

        blood_groupEt.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                parent.getItemAtPosition(position).toString();

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        submit_button = findViewById(R.id.submit_button);



       submit_button.setOnClickListener(new OnClickListener() {
           @Override
            public void onClick(View view) {

                String city = cityEt.getSelectedItem().toString();
                String blood_group = blood_groupEt.getSelectedItem().toString();
                if(isValidi(city, blood_group)) {
                    logini(city, blood_group);
                }
            }
        });
    }

    private void logini(final String city, final String blood_group){
        final StringRequest stringRequest = new StringRequest(Request.Method.POST, Endpoints.search_url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                if (response.equals("Sorry no match found")) {
                    Toast.makeText(MainActivity.this, response, Toast.LENGTH_SHORT).show();

                } else {
                    Intent intent = new Intent(MainActivity.this, ListActivity.class);
                    intent.putExtra("extra_message",response);
                    startActivity(intent);

                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Toast.makeText(MainActivity.this, "Something went wrong", Toast.LENGTH_SHORT).show();
                Log.d("VOLLEY", error.getMessage());
            }
        }){
            @Override
            protected Map<String, String> getParams() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
                params.put("blood_group", blood_group);
                params.put("city", city);
                return params;
            }
        };
        VolleySingleton.getInstance(this).addToRequestQueue(stringRequest);
    }

    private boolean isValidi(String city, String blood_group){
        if(city.isEmpty()){
            showMessage("Empty city");

            return false;
        }else if(blood_group.isEmpty()){
            showMessage("Empty blood group");

            return false;
        }
        return true;
    }

    private void showMessage(String msg){
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
    }
}
